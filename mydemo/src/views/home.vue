<template>
  <div>
    <div id="con"></div>
  </div>
</template>

<script>
import Echart from "echarts";
export default {
  data() {
    return {};
  },
  mounted() {
    //挂载
    console.log(this);
    let myChart = Echart.init(document.getElementById("con"));
    let options = {
      title: {
        text: "本系统的周访问量",
        textStyle: {
          color: "#663366",
          fontSize: 30,
        },
        textAlign: "auto",
      },
      xAxis: {
        type: "category",
        data: [
          "星期一",
          "星期二",
          "星期三",
          "星期四",
          "星期五",
          "星期六",
          "星期日",
        ],
      },
      yAxis: {
        type: "value",
      },
      series: [
        {
          data: [66, 500, 999, 1400, 800, 500, 1500],
          type: "line",
          itemStyle: {
            normal: {
              lineStyle: {
                color: "#663366",
              },
            },
          },
        },
      ],
    };
    myChart.setOption(options);
  },
};
</script>

<style lang="" scoped>
#con {
  width: 800px;
  height: 500px;
  margin: 30px auto;
}
</style>
