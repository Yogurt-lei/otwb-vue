<!--省信息-->
<template>
  <el-table border highlight-current-row size="mini" :data="tableData" style="width: 100%"
            :row-class-name="tableRowClassName">
    <!--自定义行数据展开-->
    <el-table-column type="expand">
      <template slot-scope="props">
        <el-form label-position="left" inline class="table-expand">
          <el-form-item label="ID">
            <span>{{ props.row.id }}</span>
          </el-form-item>
          <el-form-item label="编码">
            <span>{{ props.row.code }}</span>
          </el-form-item>
          <el-form-item label="名称">
            <span>{{ props.row.name }}</span>
          </el-form-item>
        </el-form>
      </template>
    </el-table-column>
    <!--checkbox-->
    <el-table-column type="selection" width="35"/>
    <el-table-column type="index"/>
    <el-table-column prop="id" label="ID" width="120" sortable/>
    <el-table-column prop="code" label="编码" width="100" sortable/>
    <el-table-column prop="name" label="名称"/>
    <el-table-column fixed="right" label="操作">
      <template slot-scope="scope">
        <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
  import axios from '@/plugins/axios';

  export default {
    data() {
      return {
        tableData: []
      }
    },
    created() {
      this.loadData();
    },
    methods: {
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 === 0) {
          return 'odd-row';
        } else {
          return 'even-row';
        }
      },
      handleEdit(index, row) {
        alert(index + "-->" + row);
        console.log(index, row);
      },
      handleDelete(index, row) {
        alert(index + "-->" + row);
        console.log(index, row);
      },
      loadData() {
        axios({
          method: 'get',
          url: '/api/base/provinceList',
          params: {pageNum: '1', pageSize: '10'}
        }).then((data) => {
          this.tableData = data.list;
        });
      }
    },
  }
</script>
<style>
</style>
