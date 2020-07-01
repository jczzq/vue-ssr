/**
 * CacheData
 * 轻量缓存, 阻止重复请求
 */

export default class CacheData {
  constructor(data = null) {
        // 数据
    this.data = data;

        // 是否正在加载
    this.loading = false;
        // 是否加载完毕
    this.loaded = false;
        // 请求队列
    this.resolves = [];
  }
  async Load(req, { force = false, param } = {}) {
        // 重复请求 返回一个待定的Promise，并将resolve回调push进缓冲栈
    if (this.loading) {
      return new Promise(resolve => {
        this.resolves.push(resolve);
      });
    }
        // 已有数据直接返回，除非强制请求
    if (this.loaded && !force) {
      return Promise.resolve(this.data);
    }
    try {
      this.loaded = false;
      this.loading = true;
      const res = await req(param);
      this.loaded = true;
      this.data = res;

            // 执行并清空缓冲栈
      for (var r of this.resolves) {
        r && r(res);
      }
      this.resolves = [];

            // 返回最初的promise
      return res;
    } catch (error) {
      return Promise.reject(error);
    } finally {
      this.loading = false;
    }
  }
}
