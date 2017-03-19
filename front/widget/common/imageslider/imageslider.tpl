<div class="slide-box market-widget-imageslider">
    <div class="swipe slider">
        <div class=" swipe-wrap" style="width:100%">
            <div class="item" v-for="item in thumbnails
            "><img v-bind:src="item"></div>
        </div>
    </div>
    <ul class="nav">
    	<li v-for="(index, item) in thumbnails" v-bind:class="{ 'active': index === curIndex}">
    	</li>
    </ul>
</div>