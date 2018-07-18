<style>
/*分页样式*/
.pagination {
  padding: 15px 20px;
  text-align: right;
  color: #ccc;
}
.pagination::after {
}
.pagination > li.total span,
.pagination > li.total span:hover {
  border: none;
  color: #333;
  padding: 0 10px;
  line-height: 25px;
  background: none;
}
.pagination > li > a {
  display: inline-block;
  color: #2b4965;
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  border: 1px solid #2b4965;
  margin: 0 2px;
  border-radius: 4px;
  vertical-align: middle;
  cursor: pointer;
}
.pagination > li > a:hover {
  text-decoration: none;
  color: #fff;
  border: 1px solid #2b4965;
  background: #2b4965;
}
.pagination > li > span.current {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  margin: 0 2px;
  color: #fff;
  background-color: #2b4965;
  border: 1px solid #2b4965;
  border-radius: 4px;
  vertical-align: middle;
}
.pagination > li > span.disabled {
  display: inline-block;
  height: 25px;
  line-height: 25px;
  padding: 0 10px;
  margin: 0 2px;
  color: #bfbfbf;
  background: #f2f2f2;
  border: 1px solid #bfbfbf;
  border-radius: 4px;
  vertical-align: middle;
}
</style>
<template>
    <ul class="pagination">
        <li class="total" v-if="total != 0"><span>共{{total}}条数据</span></li>
        <li>
            <a @click="pageJump(current-1)" class="prevPage" v-if="current!=1">上一页</a>
            <span v-else class="disabled">上一页</span>
        </li>
        <li v-for="index in indexs">
            <a @click="pageJump(index)" v-if="current!=index">{{ index }}</a>
            <span class="current" v-else>{{ index }}</span>
        </li>
        <li>
            <a @click="pageJump(current+1)" class="nextPage" v-if="current!=pageCount">下一页</a>
            <span v-else class="disabled">下一页</span>
        </li>
    </ul>
</template>
<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    pageCount: {
      type: Number
    },
    total: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {};
  },
  computed: {
    indexs: function() {
      var left = 1;
      var right = this.pageCount;
      var ar = [];
      if (this.pageCount >= 11) {
        if (this.current > 5 && this.current < this.pageCount - 4) {
          left = this.current - 5;
          right = this.current + 4;
        } else {
          if (this.current <= 5) {
            left = 1;
            right = 10;
          } else {
            right = this.pageCount;
            left = this.pageCount - 9;
          }
        }
      }
      while (left <= right) {
        ar.push(left);
        left++;
      }
      return ar;
    }
  },
  methods: {
    pageJump(index) {
      this.$emit("change", index);
    }
  }
};
</script>