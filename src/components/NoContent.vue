<style lang="scss">
#no-content {
    img {
        width: 200px;
        height: 200px;
        margin-right: 30px;
        vertical-align: middle;
    }

    div {
        display: inline-block;
        vertical-align: middle;
    }

    h3 {
        color: rgb(51, 51, 51);
        font-size: 24px;
        margin: 20px 0;
        font-weight: 400;
        line-height: 24px;
    }

    p {
        color: rgb(102, 102, 102);
        margin-bottom: 7px;
        font-size: 14px;
        line-height: 20px;
    }

    button {
        margin-top: 15px;
    }

    a {
        color: $color-blue-normal;
    }
}
</style>

<template>
    <div id="no-content">
        <img :src="$resize(`${$cdn.image}owner/no-content`, { width: 400 })"
             alt="no-content">
        <div>
            <h3>暂无内容</h3>
            <p>抱歉，该页面暂无内容，请看看其他页面</p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'NoContent'
};
</script>
