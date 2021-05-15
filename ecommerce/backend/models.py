from django.db import models
from django.db import connection


class Top5Items(object):
    def getOrdersFromPast5Days():
        queryset = None
        with connection.cursor() as cursor:
            cursor.execute('SELECT backend_order.ordered_date, backend_item.price * backend_orderitem.quantity AS total FROM backend_order JOIN backend_order_items ON backend_order.id = backend_order_items.order_id  JOIN backend_orderitem ON backend_order_items.orderitem_id = backend_orderitem.id JOIN backend_item ON backend_item.id = backend_orderitem.item_id WHERE backend_order.ordered_date > (SELECT DATETIME("now", "-6 day")) GROUP BY  backend_order.id')
            queryset = cursor.fetchall()
            queryset = [{'order': sub[0], 'date': sub[1]}
                        for sub in queryset]

        return queryset

    def getTop5UniqueSel():
        queryset = None
        with connection.cursor() as cursor:
            cursor.execute('SELECT backend_item.title, COUNT(*) FROM backend_item JOIN backend_orderitem ON backend_item.id = backend_orderitem.item_id GROUP BY backend_orderitem.item_id ORDER BY COUNT(*) DESC LIMIT 5')
            queryset = cursor.fetchall()
            queryset = [{'item': sub[0], 'quantity': sub[1]}
                        for sub in queryset]

        return queryset

    def getTop5items():
        queryset = None
        with connection.cursor() as cursor:
            cursor.execute('SELECT backend_item.title ,SUM(backend_orderitem.quantity) FROM backend_item JOIN backend_orderitem ON backend_item.id = backend_orderitem.item_id GROUP BY backend_orderitem.item_id ORDER BY SUM(backend_orderitem.quantity) DESC LIMIT 5')
            queryset = cursor.fetchall()
            queryset = [{'item': sub[0], 'quantity': sub[1]}
                        for sub in queryset]

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
