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
                this.collection.on('add', this.addOne, this);
            },
            render: function(){
                this.addAll();
            },
            addOne: function(content){
                var hotContentView = new HotContentView({model:content, tagName: "div", className: "item"});

                $('#hotItemCarouseInner').append(hotContentView.reander().el);
                $('#hotItemIndicator').append('<li data-target="#hotItemCarousel" data-slide-to="' + content.get("id") + '"></li>');
            },
            addAll: function(){
                this.$('#hotItemCarouseInner').html('');
                this.$('#hotItemIndicator').html('');

                this.collection.forEach(this.addOne, this);

                $("#hotItemCarouseInner div:eq(0)").addClass("active");
            }
        });

        var hotContentList = new HotContentList();
        var hotContentListView = new HotContentListView({collection:hotContentList});
        hotContentList.fetch({success : function() {hotContentListView.render();}});
    });
});