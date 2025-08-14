import pika
import json
from pika.adapters.utils.connection_workflow import AMQPConnectorException
import requests

RABBITMQ_URL = "amqp://guest:guest@localhost:5672/"
API_SAUDE_URL = ""


def callback(ch, method, properties, body):
    try:
        paciente_data = json.loads(body.decode())
        response = requests.post(API_SAUDE_URL,json=paciente_data)
        if response.ok:
            print({"status": response.status_code})
            ch.basic_ack(delivery_tag=method.delivery_tag)
        else:
            print(f"erro: {response.status_code} - {response.text}")
            ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
    except Exception as e:
        print(f"Erro no consumidor: {e}")
        ch.basic_nack(delivery_tag=method.delivery_tag, requeue=True)
import time
def iniciar_consumidor():
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
    print("RABBIMQ CONNECTED")
    channel = connection.channel()
    channel.queue_declare(queue='pacientes', durable=True)
    channel.basic_qos(prefetch_count=1)
    channel.basic_consume(queue='pacientes', on_message_callback=callback)
    channel.start_consuming()

