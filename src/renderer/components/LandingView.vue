<template lang="html">
  <div id="wrapper">
    <div id="header">
      <h1>Smart365</h1>
    </div>
    <!-- <img id="logo" src="~@/assets/logo.png" alt="electron-vue"> -->
    <main>
      <div class="left-side">
        <div id="root" class="">

        <div id="nav" class="">
          <Login/>
          <Customers />
        </div>
        <div id="section" class="">

        </div>

        </div>
      </div>

      <div class="right-side">
        <div class="map-wrapper">
          <el-amap vid="amapDemo" :map-manager="amapManager" :plugin="plugin" :zoom="zoom" :center="center" :mapStyle="mapStyle">
            <el-amap-marker v-for="marker in markers" :position="marker.position" :title="marker.title"></el-amap-marker>
          </el-amap>
        </div>
      </div>
    </main>
    <div id="footer" class="">
      Copyright www.sitech365.com
    </div>
  </div>

</template>

<script>
  import Login from './Login'
  import Customers from './CustomerView'
  import {AMapManager} from 'vue-amap'
  import {mapState} from 'vuex'
  export default {
    components: {
      Login,
      Customers,
      SystemInformation
    },
    data () {
      let self = this
      return {
        amapManager: new AMapManager(),
        zoom: 12,
        center: [121.599, 31.197],
        mapStyle: 'dark',
        plugin: [{
          pName: 'Geolocation',
          events: {
            init (o) {
              o.getCurrentPosition((status, result) => {
                if (result && result.position) {
                  self.center = [result.position.lng, result.position.lat]
                  console.log('OK')
                  self.$nextTick()
                }
              })
            }
          }
        }]
        // markers: []
      }
    },
    // mounted () {
    // // 姑且N为2
    // // 这样地图上就添加了两个人
    //   this.markers = [
    //     {position: [121.5273285, 31.21515044]},
    //     {position: [121.5273286, 31.21515045]}
    //   ]
    // }
    computed: mapState({
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

<style lang="css" scoped="">
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100%;
    padding: 10px 20px;
    width: 100%;
  }


  main {
    display: flex;
    width: 100%;
    height: 100%;
    /*justify-content: space-between;*/
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    width: 30%;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

#header {
  background-color: black;
  color: white;
  text-align: center;
  padding: 5px;
}
#nav {
    line-height:10px;
    /*background-color:#eeeeee;*/
    /*height:300px;
    width:350px;*/
    float:left;
    padding:5px;
}
#section {
    width:350px;
    float:left;
    padding:10px;
}
#footer {
    background-color:black;
    color:white;
    clear:both;
    text-align:center;
    padding:5px;
}
.map-wrapper {
  width: 100%;
  height: 800px;
}
</style>
