import pika
import json
import uuid
#comando para rodar o rabbitmq: docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

RABBITMQ_URL = "amqp://guest:guest@localhost:5672/"

def envia_para_fila_rpc(paciente_data: dict):
    params = pika.URLParameters(RABBITMQ_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    # Declara uma fila exclusiva (temporária) para receber a resposta
    result = channel.queue_declare(queue='', exclusive=True)
    callback_queue = result.method.queue

    corr_id = str(uuid.uuid4())
    response_data = {}

    def on_response(ch, method, props, body):
        if props.correlation_id == corr_id:
            response_data["body"] = json.loads(body)
            ch.stop_consuming()

    channel.basic_consume(
        queue=callback_queue,
        on_message_callback=on_response,
        auto_ack=True
    )

    # Publica a mensagem com reply_to e correlation_id
    channel.basic_publish(
        exchange='',
        routing_key='pacientes',
        body=json.dumps(paciente_data),
        properties=pika.BasicProperties(
            reply_to=callback_queue,
            correlation_id=corr_id
        )
    )

    # Aguarda até receber a resposta
    channel.start_consuming()
    connection.close()

    return response_data.get("body")

def envia_para_fila_rpc_busca_paciente(id_paciente: str):
    params = pika.URLParameters(RABBITMQ_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    # Fila exclusiva para resposta
    result = channel.queue_declare(queue='', exclusive=True)
    callback_queue = result.method.queue

    corr_id = str(uuid.uuid4())
    response_data = {}

    def on_response(ch, method, props, body):
        if props.correlation_id == corr_id:
            try:
                response_data["body"] = json.loads(body)
            except json.JSONDecodeError:
                response_data["body"] = body.decode()
            ch.stop_consuming()

    channel.basic_consume(
        queue=callback_queue,
        on_message_callback=on_response,
        auto_ack=True
    )

    # Publica o ID como mensagem
    channel.basic_publish(
        exchange='',
        routing_key='pacientes_get',
        body=json.dumps({"idPaciente": id_paciente}),
        properties=pika.BasicProperties(
            reply_to=callback_queue,
            correlation_id=corr_id
        )
    )

    # Aguarda resposta
    channel.start_consuming()
    connection.close()

    return response_data.get("body")