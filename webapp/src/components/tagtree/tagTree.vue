<template>
  <div class="tagTree">
    全景树
    <child-activity />

    <svg id="mainsvg"></svg>
  </div>
</template>

<script>
import * as d3 from "d3";
import ChildActivity from "../childActivity/childActivity.vue";
export default {
  data() {
    return {
      nodeData: {},
      moduleId: "mod_202103211516",
      CNlang: true,
    };
  },
  components: {
    ChildActivity,
  },
  created() {
    this.getNodeData().then((data) => {
      this.initTree(data);
    });
  },
  methods: {
    getNodeData() {
      let url = "/cscloud-zone-date/getNodeTree";
      // this.$http.get(url).then((data) => {
      //   console.log("data", data);
      //   this.nodeData = data;
      // });

      return new Promise((resolve, reject) => {
        this.$http.get(url).then((res) => {
          if (res) {
            console.log("data", res);
            let data = res.data;
            this.nodeData = res.data;

            resolve(data);
          } else {
            reject();
          }
        });
      });
    },
    initTree(source) {
      console.log(source);

      let _this = this;
      let dx = 36; // 上下边距
      let dy = 52; // 左右边距
      // 预处理数据
      let root = d3.hierarchy(source);
      let tree = d3.tree().nodeSize([dx, dy]);
      let svg = d3.select("#mainsvg");

      function update(root) {
        // 处理节点
        var nodes = tree(root).descendants();
        console.log("nodes", nodes);

        // 添加容器
        const gContent = svg
          .append("g")
          .attr("id", "gContentWrap_" + _this.moduleId);

        // 画一个节点
        const gNode = gContent
          .append("g")
          .attr("cursor", "pointer")
          .attr("id", "boxContent_" + _this.moduleId);

        // 一个节点和线结合
        const node = gNode.selectAll("g").data(nodes, (d) => d.id);
        console.log('node --- ', node)
        // node enter
        const nodeEnter = node
          .enter()
          .append("g")
          .attr("id", (d) => "box" + d.data.id)
          // .attr(
          //   "transform",
          //   `translate(${source && source.y0}, ${source && source.x0}`
          // )
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);

        // node 添加 rect
        nodeEnter
          .append("rect")
          .attr("width", "145px")
          .attr("height", "28px")
          .attr("id", (d) => "rect" + d.data.id)
          .attr("stroke", "c0cfdc")
          .attr("fill", "#fff")
          .on("click", (d) => {
            console.log("click", d);
          });

        // node 添加文字
        nodeEnter
          .append("text")
          .attr("dy", "19")
          .attr("dx", "13")
          .attr("class", "tree_text")
          .attr("font-size", "12")
          .text((d) => {
            return _this.CNlang ? d.data.nameCn : d.data.nameEn;
          })
          .on("click", (d) => {
            console.log("d", d);
          })
          .attr("stroke-linejoin", "round")
          .attr("stroke-width", 3)
          .attr("stroke", "#021123");

        // let duration = event && event.altKey ? 2500 : 250;
        // const transition = svg
        //   .transition()
        //   // .duration(duration)
        //   .attr("height", window.screen.height);
        // .tween('resize', )

        // let boxWidthy = 30;
        // let boxWidthx = 30;
        node
          .merge(nodeEnter)
          // .transition(transition)
          // .attr(
          //   "transform",
          //   (d) => `translate(${d.y + d.depth * boxWidthy}, ${d.x - boxWidthx})`
          // )
          .attr("fill-opacity", 1)
          .attr("stroke-opacity", 1);

        node
          .exit()
          // .transition(transition)
          .remove()
          // .attr(
          //   "transform",
          //   `translate(${source && source.y0}, ${source && source.x0}`
          // )
          .attr("fill-opacity", 0)
          .attr("stroke-opacity", 0);
      }
      update(root);
    },
  },
};
</script>


<style scoped src='./tagTree.css'>
</style>