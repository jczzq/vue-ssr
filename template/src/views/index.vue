<template>
    <div class="shop-guide">
        SSR
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'shop-guide',
  components: {},
  async asyncData({ store, ctx }) {
    const [carInfo, channelInfo, orderChannel] = [{}, {}, ''];
    await store.dispatch('guide/LOAD_LIST', {
      param: {
        areaInfo: {
          city: '',
          cityId: '',
          province: '',
          provinceId: ''
        },
        filter: {
          specialTireSize: carInfo.SpecialTireSizeForSingle,
          tireSize: carInfo.TireSizeForSingle
        },
        channel: channelInfo.channel,
        orderChannel: orderChannel,
        orderType: 0,
        vehicle: {
          displacement: carInfo.PaiLiang || carInfo.Pailiang,
          nian: carInfo.Nian,
          tid: carInfo.Tid || carInfo.TID,
          vehicleId: carInfo.VehicleId || carInfo.VehicleID
        }
      },
      ctx
    });
  },
  computed: {
    ...mapState('topic', {
      topicList: 'list',
      loading: 'loading'
    })
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>

<style lang="scss">
</style>
