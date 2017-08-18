function Container() {
	this.id = '';
	this.className = '';
	this.htmlCode = '';
}
Container.prototype.render = function() {
	return this.htmlCode
}
function Basket() {
	Container.call(this);

	this.id = 'basket';
	this.countGoods = 0;
	this.amount = 0;
	this.goodItems = [];
}
Basket.prototype = Object.create(Container.prototype);
Basket.prototype.constructor = Basket;
Basket.prototype.render = function(wrapper) {
	this.$divBasket = $('<div>').attr({
			id: this.id
		}).text('Корзина');

	this.$divBasket.appendTo(wrapper);

	this.getGoodItems();
}
Basket.prototype.getGoodItems = function() {
	$.ajax({
		url : 'basket.goods.json',
		dataType : 'json',
		context : this,
		success : function(data) {
			if(data.result == 1) {
				this.countGoods = data.basket.length;
				this.amount = data.amount;
				this.goodItems = data.basket;

				this.$divData = $('<div>').attr({'class' : 'div-data'});
				this.$divData.append( $('<p>').attr({'class' : 'count-good'}).text('Всего товаров в корзине: ' + this.countGoods) )
				this.$divData.append( $('<p>').attr({'class' : 'amount'}).text('На сумму: ' + this.amount) )
				this.$divData.appendTo(this.$divBasket);

			} else {
				console.log('что-то на сервере не так');
			}
		},
		error : function(err) {
			console.log(err.message)
		}
	});
}
Basket.prototype.add = function(idGood, quantity, price) {
	this.countGoods += quantity;
	this.amount += price;
	this.goodItems.push({
		id_good : idGood,
		price : price
	});
	this.refresh();
}
Basket.prototype.refresh = function() {
	this.$divData.empty();
	this.$divData.append( $('<p>').attr({'class' : 'count-good'}).text('Всего товаров в корзине: ' + this.countGoods) )
	this.$divData.append( $('<p>').attr({'class' : 'amount'}).text('На сумму: ' + this.amount) )
	this.$divData.appendTo(this.$divBasket);
}
var basket = new Basket();
// var $basketWrapper = $('#basket-wrapper');
basket.render('#basket-wrapper');
//# sourceMappingURL=main.js.map
