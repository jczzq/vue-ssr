<style lang="scss">
$meta-height: 30px;
$meta-margin-bottom: 8px;
.v-parts {
    $meta-height: 30px;
    $meta-margin-bottom: 8px;
    margin-bottom: 5px;
    position: relative;
    padding-right: 55px;

    li {
        float: left;
        margin: 0 8px $meta-margin-bottom 0;
    }

    .more,
    a {
        border: 1px solid $color-gray-deep;
        height: $meta-height;
        color: $color-link;
        border-radius: 4px;
        display: block;
        transition: 0.2s;
        padding: 0 15px 0 8px;
        font-size: 14px;
        line-height: 28px;

        span {
            min-width: 16px;
            margin-right: 5px;
            display: inline-block;
            text-align: right;
        }

        &:hover {
            border-color: $color-blue-light;
            background-color: $color-blue-light;
            color: $color-white;
        }
    }

    .more {
        position: absolute;
        right: 0;
        top: 0;
        width: 50px;
        padding-right: 8px;
        text-align: center;
    }

    .active {
        border-color: $color-blue-light;
        background-color: $color-blue-light;
        color: $color-white !important;
    }
}
</style>

<template>
    <ul class="v-parts"
        v-if="maxWidth">
        <li v-for="item in filterList"
            :key="item.id">
            <a :class="{ 'active' : id === item.id }"
               :style="{ width: `${maxWidth}px` }"
               :href="alias(item.id)">
                <slot :item="item"></slot>
            </a>
        </li>
        <button v-if="showMoreBtn"
                @click="handleFilter"
                class="more">
            {{ showAll ? '收起' : '展开' }}
        </button>
    </ul>
</template>

<script>
export default {
    name: 'v-parts',
    props: {
        list: {
            type: Array,
            required: true
        },
        alias: {
            type: Function,
            required: true
        },
        value: {
            type: Boolean,
            default: false
        },
        isFirst: {
            type: Boolean,
            default: true
        },
        forceAll: {
            type: Boolean,
            default: false
        },
        allData: {
            type: Array,
            required: true
        }
    },
    watch: {
        value(val) {
            this.showAll = val;
        },
        showAll(val) {
            this.$emit('input', val);
        }
    },
    computed: {
        id() {
            return parseInt(this.$route.params.id, 10);
        },
        filterList() {
            if (this.forceAll || this.showAll) {
                return this.list;
            }
            const begin = (this.page - 1) * this.take;
            return this.list.slice(begin, begin + this.take);
        },
        showMoreBtn() {
            return this.forceAll
                ? this.forceAll && this.isFirst
                : this.isFirst && this.take < this.list.length;
        }
    },
    data() {
        return {
            maxWidth: 0,
            take: 0,
            part: 0,
            page: 0,
            showAll: this.value
        };
    },
    methods: {
        computeMaxWidth() {
            let maxlength = 0;
            this.allData.forEach(video => {
                const templength = video.name.replace(/([\u4e00-\u9fa5])/g, 'aa').trim().length;
                if (maxlength < templength) {
                    maxlength = templength;
                }
            });
            this.maxWidth = 46 + maxlength * 8;
            this.$nextTick(() => {
                this.computePage();
            });
        },
        computePage() {
            this.take = Math.floor(this.$el.offsetWidth / (this.maxWidth + 8)) * 2;
            this.list.forEach((item, index) => {
                if (item.id === this.id) {
                    this.part = index + 1;
                }
            });
            this.page = Math.ceil(this.part / this.take);
        },
        handleFilter() {
            this.showAll = !this.showAll;
        }
    },
    mounted() {
        this.computeMaxWidth();
        this.$watch('list', () => {
            this.computeMaxWidth();
        });
    }
};
</script>
