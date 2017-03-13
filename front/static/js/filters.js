Vue.filter('price', function (value) {
    return (value / 10000).toFixed(2)
});
