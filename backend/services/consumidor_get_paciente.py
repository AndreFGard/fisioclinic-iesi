import pika
import json
import requests
import os
from dotenv import load_dotenv

load_dotenv()

RABBITMQ_URL = "amqp://guest:guest@localhost:5672/"
API_SAUDE_TOKEN = os.getenv("API_SAUDE_TOKEN")

def callback(ch, method, properties, body):
    try:
        msg = json.loads(body.decode())
        id_paciente = msg.get("idPaciente")
        headers = {"Accept": "application/json"}
        if API_SAUDE_TOKEN:
            headers["Authorization"] = f"Bearer {API_SAUDE_TOKEN}"
        # Faz requisição GET na URL externa

        url = f"https://api.tisaude.com/api/patients/{id_paciente}"
        response = requests.get(url,headers=headers)

        if response.ok:
            result = response.json()
        else:
            result = f"erro: {response.status_code} - {response.text}"

        # Se o produtor indicou reply_to, devolve resposta
        if properties.reply_to:
            ch.basic_publish(
                exchange='',
                routing_key=properties.reply_to,
                body=json.dumps(result),
                properties=pika.BasicProperties(
                    correlation_id=properties.correlation_id
                )
            )

        ch.basic_ack(delivery_tag=method.delivery_tag)

    except Exception as e:
        error_msg = {"status": "erro", "msg": str(e)}
        if properties.reply_to:
            ch.basic_publish(
                exchange='',
                routing_key=properties.reply_to,
                body=json.dumps(error_msg),
                properties=pika.BasicProperties(
                    correlation_id=properties.correlation_id
                )
            )
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=False)
import time
def iniciar_consumidor_busca_paciente():
    params = pika.URLParameters(RABBITMQ_URL)
    connection = None
    for i in range(7):
        try:
            connection = pika.BlockingConnection(params)
        except Exception as e :
            print("trying rabbitmq connection again")
            time.sleep(1)
    if not connection:
        print("giving up: CONSUMER IS OFF")
        return False
    print("RABBIMQ GET_PACIENTE CONNECTED")
    channel = connection.channel()
    channel.queue_declare(queue='pacientes_get', durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='pacientes_get', on_message_callback=callback)
    channel.start_consuming()