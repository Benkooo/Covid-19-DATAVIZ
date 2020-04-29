import qrcode
import datetime
from pathlib import Path
import random
import string

def generate_path(_dir='static/img', _len=20):
    my_file = Path(_dir + ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(_len)) + '.png')
    while my_file.exists():
        my_file = Path(_dir + ''.join(random.SystemRandom().choice(string.ascii_uppercase + string.digits) for _ in range(_len)) + '.png')
    return my_file

def generate_qrcode(creation_date, name: str, first_name: str, birthdate, birthtown: str, address: str, exitdate, reason: list):
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_M,#ERROR_CORRECT_L ERROR_CORRECT_M ERROR_CORRECT_Q ERROR_CORRECT_H
        box_size=20,
        border=4,
    )

    qr.add_data('Cree le: {}; Nom: {}; Prenom: {}; Naissance: {} a {}; Adresse: {}; Sortie: {}; Motifs: {}'.format(
        creation_date.strftime('%d/%m/%Y a %Hh%M'),
        name,
        first_name,
        birthdate.strftime('%d/%m/%Y'),
        birthtown,
        address,
        exitdate.strftime('%d/%m/%Y a %Hh%M'),
        '-'.join(reason)))  ##travail-courses
    qr.make(fit=True)

    img = qr.make_image(fill_color="black", back_color="white")

    path = generate_path()
    img.save(path)
    return path

#generate_qrcode('', 'Dupont', 'Jean', datetime.datetime(year=1970, month=1, day=1), 'Lyon', '999 avenue de france 75001 Paris', datetime.datetime(year=2020, month=4, day=28, hour=15, minute=34), ['travail'])

generate_qrcode(datetime.datetime(year=2020, month=4, day=28, hour=15, minute=35), 'Dupont', 'Jean', datetime.datetime(year=1970, month=1, day=1), 'Lyon', '999 avenue de france 75001 Paris', datetime.datetime(year=2020, month=4, day=28, hour=15, minute=34), ['travail'])
