<template>
  <div class="b-card" :style="[objStyle]">
    <div class="b-card-body" :style="bodyStyle">
      <div class="card-title" v-if="$slots.title || !!title">
        <slot name="title">
          <div v-if="!!title">{{ title }}</div>
        </slot>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    center: {
      type: Boolean,
      default: false,
    },
    style: {
      type: [String, Object],
      default: "",
    },
    bodyStyle: {
      type: String,
      default: "",
    },
  },
  computed: {
    textCenter() {
      return this.center ? "center" : "auto";
    },
    objStyle() {
      if (this.styleType) {
        let obj = {};
        let attr = this.style.split(";");
        for (let i = 0; i < attr.length; i++) {
          let el = attr[i];
          if (!!el) {
            let item = el.split(":");
            obj[item[0]] = item[1];
          }
        }
        return obj;
      } else {
        return this.style;
      }
    },
    styleType() {
      return typeof this.style == "string";
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
.b-card {
  margin: 0 10px;
  box-sizing: border-box;
  background-color: #fff;
  box-shadow: 0px 3px 6px rgba(30, 63, 230, 0.05);
  border-radius: 8px;
}

.b-card .b-card-body {
  padding: 8px;
}

.card-title {
  font-size: 16px;
  border-bottom: 1px solid #eeeeee;
  padding: 5px 10px;
}

.b-card + .b-card {
  margin-top: 15px;
}
</style>
