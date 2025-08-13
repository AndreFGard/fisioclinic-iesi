import pika
import json

RABBITMQ_URL = ""

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
