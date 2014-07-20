/**
 * Created by ChiHwan on 2014. 7. 13..
 */
$(function(){
    /**
     * Created by ChiHwan on 2014. 7. 13..
     */
    $(function(){
        var HotContent = Backbone.Model.extend({
            urlRoot: '/hotcontent'
        });

        var HotContentList = Backbone.Collection.extend({
            model: HotContent,
            url: '/hotcontent'
        });

        var HotContentView = Backbone.View.extend({
            template: _.template('<img src="<%= imgUrl %>"><div class="container"><div class="carousel-caption"><h1><%= subject %></h1><p><%= contents %></p></div></div>'),
            initialize: function(){
                this.model.on('remove', this.remove, this);
                this.model.on('change', this.reander, this);
            },
            reander: function(){
                var attributes = this.model.toJSON();
                $(this.el).html(this.template(attributes));
                return this;
            }
        })

        var HotContentListView = Backbone.View.extend({
            el: '#hotItemCarousel',

            initialize: function(){
                this.hotItemCarousel = this.$('#hotItemCarousel');
                this.hotItemIndicator = this.$('#hotItemIndicator');
                this.hotItemCarouseInner = this.$('#hotItemCarouseInner');

                this.collection.on('reset', this.addAll, this);
                this.collection.on('add', this.addOn, this);
            },
            render: function(){

                this.addAll();
            },
            addOn: function(content){

                var hotContentView = new HotContentView({model:content, tagName: "div", className: "item"});

                console.log(hotContentView.reander().el);
                $('#hotItemCarouseInner').append(hotContentView.reander().el);
                $('#hotItemIndicator').append('<li data-target="#hotItemCarousel" data-slide-to="4"></li>');

            },
            addActive: function(HotContent){
                var hotContentView = new HotContentView({model:HotContent, tagName: "div", className: "item active"});
                this.$('#hotItemCarouseInner').append(hotContentView.reander().el);
                this.$('#hotItemIndicator').append('<li data-target="#hotItemCarousel" data-slide-to="5" class="active"></li>');
            },
            addAll: function(){

                this.$('#hotItemCarouseInner').html('');
                this.$('#hotItemIndicator').html('');
                //this.addActive(this.collection.at(0));
                console.log(this.$('#hotItemCarouseInner'));
                this.collection.forEach(this.addOn, this);
                console.log($('.carousel ol#hotItemIndicator'));
                $("#hotItemCarouseInner div:eq(0)").addClass("active");

            }
        });

        var hotContentList = new HotContentList();
        var hotContentListView = new HotContentListView({collection:hotContentList});



        hotContentList.fetch({success : function() {hotContentListView.render();}});

    });
});