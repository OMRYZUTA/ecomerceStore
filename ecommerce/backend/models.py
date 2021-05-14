from django.db import models
from django.db import connection

class Top5Items(object):

    def getTop5items():
        queryset = None
        with connection.cursor() as cursor:
            cursor.execute('SELECT backend_item.title FROM backend_item WHERE backend_item.id IN (SELECT backend_orderitem.item_id FROM backend_orderitem GROUP BY backend_orderitem.item_id ORDER BY COUNT(backend_orderitem.quantity) DESC) LIMIT 5')
            queryset = cursor.fetchall()
            queryset = list(map(lambda x: x[0], queryset))

        return queryset


class Item(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=30)
    price = models.FloatField()
    description = models.CharField(max_length=100)
    image = models.CharField(max_length=300, null=True)

    def __str__(self):
        return self.title


class OrderItem(models.Model):
    id = models.AutoField(primary_key=True)
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"{self.quantity} of {self.item.title}"

    def get_total_item_price(self):
        return self.quantity * self.item.price


class Order(models.Model):
    id = models.AutoField(primary_key=True)
    items = models.ManyToManyField(OrderItem)
    total = models.FloatField(null=True)
    ordered_date = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.user.ordered_date)

    def get_total(self):
        total = 0
        for order_item in self.items.all():
            total += order_item.get_total_item_price()
        return total
