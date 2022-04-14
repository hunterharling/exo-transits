from datetime import datetime
import csv

from .models import PlannedTransit

SITE_URL = "https://exotransits.com"
SITE_LOGO = "https://astrotutorials-templates.s3.us-west-1.amazonaws.com/"

''' Return a datetime obj from string '''
def transit_date(date):
    print(date)

    # string: 2020-11-27 17:59
    year = date.split("-")[0]
    month = date.split("-")[1]
    day = date.split(" ")[0].split("-")[2]
    hours = date.split(" ")[1].split(":")[0]
    minutes = date.split(" ")[1].split(":")[1]

    transit_time = datetime(
        int(year),
        int(month),
        int(day),
        int(hours),  # so the notification goes out in time
        int(minutes)
    )
    return transit_time


''' Takes db json string and converts to object '''
def process_db_transit(transit, auth):
    transits = eval(transit)
    newlist = []
    print(transit)

    for t in transits:
        try:
            l = len(
                PlannedTransit.objects.filter(
                    identifier=(t['Name'] + t["start time"])
                )
            )
        except KeyError:
            l = -1
            print("KEYERROR:")
            print(t)

        if l != -1:
            newlist.append(t)

    if (auth):
        return ({"Transits": newlist})
    else:
        return ({"Transits": transits})


''' Takes content of csv file and returns object'''
def process_csv(dump):
    data = []
    labels = {}
    index = 0

    # csv
    decoded_content = dump.decode('utf-8')
    cr = csv.reader(decoded_content.splitlines(), delimiter=',')
    my_list = list(cr)

    # parse csv
    for row in my_list:
        if index == 0:
            labels["labels"] = row
        else:
            sub_index = 0
            obj = {}

            for ele in row:
                # append title with value
                try:
                    obj[labels["labels"][sub_index]] = ele
                    sub_index += 1
                except IndexError:
                    print("INDEX:")
                    print(obj)

            obj["nr"] = index
            data.append(obj)
        # index to id transits
        index += 1
    return data
