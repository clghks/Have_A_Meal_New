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
        tagName: 'div',
        className: 'carousel-inner',

        initialize: function(){
            this.collection.on('reset', this.addAll, this);
            this.collection.on('add', this.addOn, this);
        },
        render: function(){
            console.log("!!!");
            this.addAll();
        },
        addOn: function(hotContent){
            var hotContentView = new HotContentView({model:hotContent, tagName: "div", className: "item"});
            this.$el.append(hotContentView.reander().el);
        },
        addActive: function(hotContent){
            var hotContentView = new HotContentView({model:hotContent, tagName: "div", className: "item active"});
            this.$el.append(hotContentView.reander().el);
        },
        addAll: function(){

            this.addActive();
            this.collection.forEach(this.addOn, this);
        }
    });

    var hotContentList = new HotContentList();
    var hotContentListView = new HotContentListView({collection:hotContentList});

    console.log("!!!");

    hotContentList.fetch({success : function() {
     console.log("!!!");
    }, error : function() {
        console.log("@@@@");
    }});
    //hotContentListView.render();

    $('#myCarousel_list').remove();
    console.log(hotContentListView.el);
    $('#myCarousel').append(hotContentListView.el);


});
