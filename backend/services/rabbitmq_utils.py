import pika
import json
#comando para rodar o rabbitmq: docker run -d --name rabbitmq -p 5672:5672 -p 15672:15672 rabbitmq:3-management

RABBITMQ_URL = "amqp://guest:guest@localhost:5672/"

def envia_para_fila(paciente_data: dict):
    params = pika.URLParameters(RABBITMQ_URL)
    connection = pika.BlockingConnection(params)
    channel = connection.channel()

    channel.queue_declare(queue='pacientes', durable=True)

    message = json.dumps(paciente_data)
    channel.basic_publish(
        exchange='',
        routing_key='pacientes',
        body=message,
        properties=pika.BasicProperties(
            delivery_mode=2, 
        )
    )
    connection.close()
