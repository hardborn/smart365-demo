<template>
  <div>
    <header>Dashborad</header>
    <!-- <div>User {{ $route.params.user }}</div> -->
    <div class="sidebar">
      <div class="toolbar">
        <button @click="add()">add marker</button>
        <button @click="showCityInfo()">city info</button>
        <button @click="location()">location</button>
      </div>
      <ul>
        <li v-for="customer in customers">
          <input type="button" v-bind:value="customer.customerName"></input>
        </li>
      </ul>
    </div>
  
    <div class="content">
      <div class="map-wrapper">
        <el-amap vid="amapDemo" :map-manager="amapManager" :plugin="plugin" :zoom="zoom" :events="events" :center="center" :mapStyle="mapStyle">
          <el-amap-marker v-for="marker in markers" :position="marker.position" :title="marker.title"></el-amap-marker>
        </el-amap>
        </div>
    </div>
  
  </div>
</template>

<script>

import { mapState } from 'vuex'

import { AMapManager } from 'vue-amap'

export default {
  data () {
    console.log(this)
    let my = this
    return {
      amapManager: new AMapManager(),
      zoom: 12,
      zooms: [5, 18],
      center: [108.922384, 34.318653],
      map: null,
      mapStyle: 'dark',
      toolBar: null,
      events: {
        init (map) {
          console.log(map)
          my.map = map
        }
      },
      plugin: [{
        pName: 'Geolocation',
        events: {
          init (o) {
            o.getCurrentPosition((status, result) => {
              if (result && result.position) {
                my.center = [result.position.lng, result.position.lat]
                my.$nextTick()
                // console.log(self.center)
              }
            })
          }
        }
      },
      {
        pName: 'ToolBar',
        events: {
          init (instance) {
            console.log(my)
            my.toolBar = instance
          }
        }
      }]
    }
  },
  methods: {
    fetchData () {
      this.$store.dispatch('getCustomers')
    },
    add () {
      let o = this.map
      let marker = new AMap.Marker({
        position: [121.59996, 31.177646]
      })

      marker.setMap(o)
    },
    showCityInfo () {
      let self = this
      AMap.service(['AMap.CitySearch'], function () {
        // 实例化城市查询类

        var citysearch = new AMap.CitySearch()
        // 自动获取用户IP，返回当前城市

        citysearch.getLocalCity(function (status, result) {
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.city && result.bounds) {
              // var cityinfo = result.city
              var citybounds = result.bounds
              // city = cityinfo;
              // citycode = cityinfo.replace("市", "");
              // console.log("您当前所在城市：" + cityinfo + ",code:"+ cityinfo.replace("市",""));
              // console.log(cityinfo)
              self.map.setBounds(citybounds)
            }
          } else {
            console.log('您当前所在城市：' + result.info)
          }
        })
      })
    },
    location () {
      let myMap = this.map
      let self = this
      console.log(myMap)
      // this.amapManager.getMap().setFitView()
      AMapUI.loadUI(['geo/DistrictCluster'], function (DistrictCluster) {
        // window.DistrictCluster = DistrictCluster
        // 启动页面
        self.$store.dispatch('getDistCluster')
        var distCluster = new DistrictCluster({
          map: myMap, // 所属的地图实例
          topAdcodes: [610000],
          getPosition: function (item) {
            if (!item) {
              return null
            }

            // var parts = item

            // 返回经纬度
            return [parseFloat(item.longitude), parseFloat(item.latitude)]
          }
        })
        distCluster.setData(self.$store.state.Customer.customers)

        // window.distCluster = distCluster

        // $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body)
        // $.get('http://a.amap.com/amap-ui/static/data/10w.txt', function (csv) {
        //   $('#loadingTip').remove()
        //   var data = csv.split('\n')
        //   distCluster.setData(data)
        // })
      })
    }
  },
  // initPage (DistrictCluster, $) {
  //   let self = this
  //   var distCluster = new DistrictCluster({
  //     map: self.amapManager.getMap(), // 所属的地图实例
  //     getPosition: function (item) {
  //       if (!item) {
  //         return null
  //       }

  //       var parts = item.split(',')

  //       // 返回经纬度
  //       return [parseFloat(parts[0]), parseFloat(parts[1])]
  //     }
  //   })

  //  // window.distCluster = distCluster

  //   $('<div id="loadingTip">加载数据，请稍候...</div>').appendTo(document.body)
  //   $.get('http://a.amap.com/amap-ui/static/data/10w.txt', function (csv) {
  //     $('#loadingTip').remove()
  //     var data = csv.split('\n')
  //     distCluster.setData(data)
  //   })
  // },
  created () {
    this.fetchData()
  },
  // mounted () {
  //   lazyAMapApiLoaderInstance.load().then(() => {
  //         // console.log('-----')
  //         // this.map = new AMap.Map('amap-demo1', {
  //         //   center: [121.59996, 31.197646],
  //         //   zoom: 12
  //   })
  // },
  computed: mapState({
    customers: state => state.Customer.customers,
    markers (state) {
      if (state.Customer.customers == null) {
        return []
      }
      return state.Customer.customers.map(function (customer) {
        return {
          title: customer.customerName,
          position: [parseFloat(customer.longitude), parseFloat(customer.latitude)]
        }
      })
    }
  })
}
</script>
<style scoped>
.sidebar {
  position: fixed;
  width: 300px;
  left: 0;
  top: 0;
  bottom: 0;
  background-color: #eef1f6;
}
.content {
  margin-left: 300px;
  position: relative;
  width: calc(100% - 300px);
  min-height: 100vh;
  background: radial-gradient( ellipse at top left,
  rgba(255, 255, 255, 1) 40%,
  rgba(229, 229, 229, .9) 100%);
}
.map-wrapper {
  width: 100%;
  height: 800px;
}
</style>
