from django.db import models


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
