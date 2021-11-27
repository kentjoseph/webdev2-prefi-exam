const products = [
{ id: 1, title: 'Fish', price: 150.00, qty: 8, image: 'https://healthyrecipesblogs.com/wp-content/uploads/2018/01/oven-bacon-featured.jpg' },
{ id: 2, title: 'Chicken', price: 200.00, qty: 9, image: 'https://www.seriouseats.com/thmb/t82X6N4ZwGkFZmWPuCjwT-osL3g=/1500x844/smart/filters:no_upscale()/20210714-potato-starch-fried-chicken-vicky-wasik-seriouseats-20-17e193a6bf274bba9091810a0b18ef89.jpg' },
{ id: 3, title: 'Beef', price: 300, qty: 0, image: 'https://post.healthline.com/wp-content/uploads/2020/08/beef-update-1200x628-facebook-1200x628.jpg' },
{ id: 4, title: 'Soy Sauce', price: 50.00, qty: 42, image: 'https://www.tasteofhome.com/wp-content/uploads/2020/01/GettyImages-461879075.jpg?fit=700,1024' },
{ id: 5, title: ' Egg', price: 10, qty: 22, image: 'https://cdn.britannica.com/94/151894-050-F72A5317/Brown-eggs.jpg' },
{ id: 6, title: 'Pork ', price: 200, qty: 4, image: 'https://www.seriouseats.com/thmb/yHg0KQZc928Iqbm8G-aOE91gJb0=/1500x1125/filters:fill(auto,1)/__opt__aboutcom__coeus__resources__content_migration__serious_eats__seriouseats.com__recipes__images__2016__02__20160208-sous-vide-pork-chop-guide-food-lab-37-9bfa2f9b8a464bccad99ea08423b9d8e.jpg' }];



function formatNumber(n, c, d, t) {
  var c = isNaN(c = Math.abs(c)) ? 2 : c,
  d = d === undefined ? '.' : d,
  t = t === undefined ? ',' : t,
  s = n < 0 ? '-' : '',
  i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))),
  j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : '') + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : '');
};


Vue.filter('formatCurrency', function (value) {
  return formatNumber(value, 2, '.', ',');
});


Vue.component('shopping-cart', {
  props: ['items'],

  computed: {
    Total() {
      let total = 0;
      this.items.forEach(item => {
        total += item.price * item.qty;
      });
      return total;
    } },


  methods: {
  
    removeItem(index) {
      this.items.splice(index, 1);
    } } });



const vm = new Vue({
  el: '#app',

  data: {
    cartItems: [],
    items: products },


  computed: {
    totalItems() {
      return this.cartItems.reduce((accumulator, item) => {
        return accumulator + item.qty;
      }, 0);
    } },


  methods: {
  
    addToCart(itemToAdd) {
      let found = false;

   
      let itemInCart = this.cartItems.filter(item => item.id === itemToAdd.id);
      let isItemInCart = itemInCart.length > 0;

      if (isItemInCart === false) {
        this.cartItems.push(Vue.util.extend({}, itemToAdd));
      } else {
        itemInCart[0].qty += itemToAdd.qty;
      }

      itemToAdd.qty = 1;
    } } });