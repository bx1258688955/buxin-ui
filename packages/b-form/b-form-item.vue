<template>
  <div class="b-form-item">
    <label class="form-item_label" :style="{ width: labelWidth }">
      <label class="iconfont b-icon-required required" v-if="required"></label>
      {{ label }}
    </label>
    <div class="form-item_content">
      <slot></slot>
      <div v-show="errorMessage" class="b-form-item__error">
        {{ errorMessage }}
      </div>
    </div>
  </div>
</template>

<script>
import validate from "../utils/validate.js";
export default {
  name: "bFormItem",
  provide() {
    return {
      bFormItem: this,
    };
  },
  inject: ["bForm"],
  props: {
    label: {
      type: String,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
    prop: {
      type: String,
      default: "",
    },
  },
  computed: {
    labelWidth() {
      return this.bForm.labelWidth;
    },
  },
  created() {},
  mounted() {
    let _that = this;
    this.$on("validate", this.validate);
    if (this.prop) {
      _that.$parent.$emit("b.form.addField", _that.validate);
    }
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  methods: {
    // form-item的验证规则
    validate() {
      let _that = this;
      return new Promise((resolve) => {
        const des = _that.bForm.rules[this.prop];
        const model = _that.bForm.model[this.prop];
        if (!this.prop || !des) {
          resolve(true);
          return;
        }
        validate.validate(des, model, (err) => {
          if (!err) {
            this.errorMessage = "";
            resolve(true);
          } else {
            this.errorMessage = err;
            resolve(false);
          }
        });
      });
    },
  },
};
</script>

<style lang="scss">
.b-form-item {
  margin-bottom: 40px;
  display: flex;
  align-items: center;

  .form-item_label {
    text-align: right;
    vertical-align: middle;
    float: left;
    font-size: 28px;
    color: #333333;
    line-height: 80px;
    padding: 0 0 0 0;
    box-sizing: border-box;

    .required {
      color: #ff4a31;
      font-size: 40px;
    }
  }

  .form-item_content {
    flex: 1;
    line-height: 80px;
    position: relative;
    font-size: 28px;

    &::after {
      clear: both;
    }

    &::after,
    &::before {
      display: table;
      content: "";
    }

    .b-form-item__error {
      position: absolute;
      top: 100%;
      line-height: 1;
      left: 0;
      color: #f56c6c;
      font-size: 24px;
      padding-top: 12px;
    }
  }
}
</style>
