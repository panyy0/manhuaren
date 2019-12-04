
import axios from 'axios'
import { Indicator } from 'mint-ui'

export default {
  get(uri, config = {}, callback) {
    let baseUrl = process.env.DOMAIN;
    Indicator.open('加载中，请稍后...');
    axios.get(
      baseUrl + uri,
      config
    ).then(function (res) {
      Indicator.close();
      callback(res)
    }).catch(function (err) {
      console.log(err)
    });
  }
}
