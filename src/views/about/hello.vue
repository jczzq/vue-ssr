<style lang="scss">
  #about-hello {
    background-color: #fff;

    h1 {
      margin-bottom: 16px;
      margin-top: 16px;
      color: #333;
      font-size: 24px;
    }

    h3 {
      margin-top: 15px;
      color: #333;
      font-size: 18px;
      position: relative;
      padding-left: 12px;
      margin-bottom: 20px;

      &:before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        width: 3px;
        height: 100%;
        background-color: $color-blue-normal;
        border-radius: 3px;
      }
    }

    p {
      color: #333;
      font-size: 14px;
      text-indent: 2em;
      margin-top: 5px;
      line-height: 20px;
    }

    ul {
      margin: 10px 0 5px 25px;

      li {
        list-style-type: disc;
        font-size: 14px;
        color: #666;
        line-height: 25px;
        float: none;
      }
    }
  }
</style>

<template>
  <div id="about-hello">
    <v-banner></v-banner>
    <div class="container">
      <div class="col-main">
        <h1>欢迎来到 calibur.tv{{ nickname ? ',' : '！' }} {{ nickname }}</h1>
        <p>在开始之前，你应该了解一下这个网站的规则，这有助于让你得到更好使用的体验，让我们开始吧！</p>
        <h3>金币系统：</h3>
        <p>每个用户每天都可以签到一次，每次可以获取 1 金币，这种金币的使用规则如下：</p>
        <ul>
          <li>1 金币 = 1 元人民币</li>
          <li>金币可以通过签到获取，也可以让其他用户打赏给你</li>
          <li>满 100 金币就可以提现</li>
          <li>提现是需要对内容进行审核的，如果你发表过「不利于社区发展」的内容，你是无法提现的</li>
          <li>提现目前只支持支付宝转账，更多提现方式后续会研发</li>
        </ul>
        <h3>番剧系统：</h3>
        <p>无论是现在的帖子、视频，还是以后的其它功能都将以「番剧」为单位</p>
        <p>calibur.tv 现在和以后的将以动漫为核心，网站只在二次元方向发展</p>
        <h3>帖子系统：</h3>
        <p>经过上面对「金币系统」的介绍，大家应该明白，想要快速积累金币提现，就只能发表优质的内容，然后吸引其他用户为你打赏，目前打赏功能是这样的：</p>
        <ul>
          <li>只有主题帖的打赏才给予金币，对帖子回复的点赞是没有金币的</li>
          <li>每个人只能给每个帖子打赏一枚金币，打赏后，楼主的金币 +1，你的金币 -1</li>
          <li>如果你在打赏后再取消打赏，楼主获取的金币会 -1，而你的金币不会 +1，因此打赏要谨慎</li>
          <li>如果你的帖子被删除或自己删除，你通过该帖子获得的金币不会减少</li>
        </ul>
        <h3>用户系统：</h3>
        <p>我们的用户系统还处于早期阶段，可讲的也只有：</p>
        <ul>
          <li>每个用户都有自己的邀请码，每有一个人通过你的<strong>邀请码</strong>注册成为 calibur 的用户，你就会获得 1 金币</li>
        </ul>
        <h3>盖楼系统：</h3>
        <p>为了让每位动漫角色的粉丝都可以很好的为TA应援，我们开通了为偶像应援的盖楼系统</p>
        <p>相比于百度贴吧的帖子盖楼，我们的盖楼是需要一些成本（每次 1 金币）的，这样有如下好处：</p>
        <ul>
          <li>可以通过金币数和粉丝数，量化每个角色的人气，并且这个人气是具有价值的，而不是像百度贴吧那样1个粉丝可以顶很多个人</li>
          <li>每个粉丝的贡献值也是可以量化的，这样就有了"守护者"这个职称，这个职称也将是实至名归的</li>
          <li>通过可以量化的人气，我们可以创建一个人气榜，这样就可以知道谁是人气王！</li>
        </ul>
        <h3>图片系统：</h3>
        <p>大家可以将自己喜欢的动漫图片传到网上，也可以创建自己的相册</p>
        <ul>
          <li>如果是原创图片，可以在创建时勾选原创，这样的话就可以得到金币的收益</li>
          <li>网站图片必须与动漫相关，cosplay、手绘、原画等都可以</li>
          <li>目前用户无法上传漫画类别的相册，如果需要开通漫画权限，请联系网站管理员</li>
        </ul>
        <h3>交流反馈：</h3>
        <p>由于个人能力有限，网站可能会有很多不足之处，希望大家可以帮助完善</p>
        <ul>
          <li>交流与反馈QQ群：<strong>106402736</strong></li>
          <li>提现QQ群：<strong>718529809</strong>，进群请填写自己的邀请码，审核通过后方可提现</li>
          <li>其它官方交流与合作请加QQ：414927352</li>
        </ul>
        <h3>最后：</h3>
        <p>我开发这个网站的初衷只是因为对动漫的热爱，同时我也希望和我一样热爱动漫的人，可以从这份初心中获取一点回报，不再需要「用爱来发电」</p>
        <p>网站目前的功能还很弱，相信以后会更好的，我只希望为自己喜欢的东西，做一点点贡献</p>
        <p>希望，你也喜欢这个网站。by：冰淤</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'page-hello',
    head: {
      title: '欢迎'
    },
    computed: {
      nickname () {
        return this.$store.state.login ? this.$store.state.user.nickname : ''
      }
    }
  }
</script>
