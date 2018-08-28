export default {
    name: 'v-img',
    props: {
        tag: {
            type: String,
            default: 'img'
        },
        src: {
            required: true,
            type: String,
            default: ''
        },
        width: {
            type: [Number, String],
            default: 0
        },
        height: {
            type: [Number, String],
            default: 0
        },
        scale: {
            type: [Number, String],
            default: 1.3
        },
        mode: {
            type: [Number, String],
            default: 1
        },
        events: {
            type: Array,
            default: function() {
                return ['scroll'];
            }
        },
        id: {
            type: [Number, String],
            default: 0
        },
        aspect: {
            type: Number,
            default: 0
        }
    },
    render: function(createElement) {
        return createElement(this.tag, {
            class: {
                'image-lazy-init': this.aspect
            },
            style: this.aspect
                ? {
                    paddingBottom: `${this.aspect * 100}%`
                }
                : {}
        });
    },
    data() {
        return {
            listeners: {},
            resource: this.src
        };
    },
    mounted() {
        this.init();
    },
    methods: {
        init() {
            this.$nextTick(() => {
                if (this.$checkInView(this.$el, this.scale - 0)) {
                    this.loadResource(this.$el);
                } else {
                    const id = this.$eventManager.add(
                        document,
                        this.events,
                        this.$utils.throttle(() => {
                            if (this.$checkInView(this.$el, this.scale - 0)) {
                                this.loadResource(this.$el);
                                this.$eventManager.del(id);
                            }
                        }, 200)
                    );
                    if (this.id) {
                        this.$channel.$on(`image-load-${this.id}`, () => {
                            this.loadResource(this.$el);
                            this.$eventManager.del(id);
                            this.$channel.$off(`image-load-${this.id}`);
                        });
                    }
                }
            });
        },
        loadResource(image) {
            let src;
            if (this.width && this.height) {
                src = this.$resize(this.resource, {
                    width: (this.width - 0) * 2,
                    height: (this.height - 0) * 2,
                    mode: this.mode - 0
                });
            } else if (this.width) {
                src = this.$resize(this.resource, {
                    width: (this.width - 0) * 2,
                    mode: this.mode - 0
                });
            } else if (this.height) {
                src = this.$resize(this.resource, {
                    height: (this.height - 0) * 2,
                    mode: this.mode - 0
                });
            } else {
                src = this.$resize(this.resource);
            }

            if (this.tag.toLowerCase() === 'img') {
                image.setAttribute('src', src);
                if (this.aspect) {
                    image.addEventListener('load', () => {
                        image.removeAttribute('style');
                        image.classList.add('image-lazy-active');
                        setTimeout(() => {
                            image.classList.remove('image-lazy-init', 'image-lazy-active');
                        }, 300);
                    });
                }
            } else {
                image.style.backgroundImage = `url(${src})`;
            }
        }
    }
};
