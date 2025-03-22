import datetime

time = "7pm"
today = datetime.date.today()
day_of_week = today.weekday()
days_until_sunday = (6 - day_of_week) % 7
first_sunday = today + datetime.timedelta(days=days_until_sunday)

for i in range(8):
    next_sunday = first_sunday + datetime.timedelta(weeks=i)
    print(next_sunday.strftime("%A, %B %-d") + " at " + time)
