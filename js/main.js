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
		url : '/basket.goods.json',
		dataType : 'json',
		context : this,
		success : function(data) {
			if(data.result == 1) {
				this.countGoods = data.basket.length;
				this.amount = parseInt(data.amount);
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
	this.amount += +price;
	this.goodItems.push({
		id_product : idGood,
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
function Review() {
	Container.call(this);
	this.id = 'review';
	this.goodReviews = [];
}
Review.prototype = Object.create(Container.prototype);
Review.prototype.constructor = Review;

Review.prototype.render = function() {
	this.$div = $('<div>').attr({'class' : 'review'});
};

Review.prototype.getReviews = function(idProduct) {
	$.ajax({
		url : 'review.good.json',
		dataType : 'json',
		context : this,
		success : function(data) {
			if(data.result == 1) {
				var resultSearch = $(data.goods).each(function(inx, value) {
					// console.log( inx );
					if(value.id_product == idProduct) return true;
				});
			}
		},
		error : function() {
		}
	});
};
//# sourceMappingURL=main.js.map
