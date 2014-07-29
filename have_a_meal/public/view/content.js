/**
 * Created by clghks on 2014-07-23.
 */
$(function(){
    var Content = Backbone.Model.extend({
        urlRoot: '/content'
    });

    var ContentList = Backbone.Collection.extend({
        model: Content,
        url: '/content'
    });

    var ContentView = Backbone.View.extend({
        tagName: 'div',
        className: 'row featurette',
        template: _.template(
            '<div class="col-md-7">' +
                '<h2 class="featurette-heading"><%= subject %></h2>' +
                '<p class="lead"><%= contents %></p>' +
            '</div>'),
        initialize: function(){
            this.model.on('remove', this.remove, this);
            this.model.on('change', this.reander, this);
        },
        events: {
            "click .col-md-7" : "showModal",
            "click .featurette-image" : "showModal"
        },
        showModal: function(e){
            $('#myModal').modal();
            $('#myModalLabel').html(this.model.get('subject'));
            $('#modalImage').attr('src', this.model.get('imgUrl'));
            $('#modalContent').html(this.model.get('contents'));
        },
        reander: function(){
            var attributes = this.model.toJSON();
            var html;
            if(this.model.get('index') % 2 == 0){
                html = '<div class="col-md-5">' +
                            '<img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="500x500" src="'+ this.model.get('imgUrl') +'">' +
                       '</div>' + this.template(attributes);
            }else{
                html = this.template(attributes) +
                    '<div class="col-md-5">' +
                        '<img class="featurette-image img-responsive" data-src="holder.js/500x500/auto" alt="500x500" src="'+ this.model.get('imgUrl') +'">' +
                    '</div>';
            }

            $(this.el).html(html);
            return this;
        }
    })

    var ContentListView = Backbone.View.extend({
        el: '#contentContainer',
        index : 0,
        initialize: function(){
            this.collection.on('reset', this.addAll, this);
            this.collection.on('add', this.addOne, this);
        },
        render: function(){
            this.addAll();
        },
        addOne: function(content){
            content.set({index:this.index});
            var contentView = new ContentView({model:content});
            $(this.el).append('<hr class="featurette-divider">');
            $(this.el).append(contentView.reander().el);
            this.index++;
        },
        addAll: function(){
            $(this.el).html('');
            this.index = 0;
            this.collection.forEach(this.addOne, this);
            $(this.el).append('<hr class="featurette-divider">');
        }
    });

    var contentList = new ContentList();
    var contentListView = new ContentListView({collection:contentList});
    contentList.fetch({reset:true});
});