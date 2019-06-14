<template>
    <div>
        <el-table :data="items">
            <el-table-column prop="_id" label="ID" width="240">
            </el-table-column>
            <el-table-column prop="name" label="名称" width="240">
            </el-table-column>
            <el-table-column
            fixed="right"
            label="操作"
            width="180">
                <template slot-scope="scope">
                    <!-- 路径前面加个斜杠，从根路径开始 -->
                    <el-button @click="$router.push(`/ads/edit/${scope.row._id}`)" type="text" size="small">编辑</el-button>
                    <el-button @click="remove(scope.row)" type="text" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            items: []
        }
    },
    methods: {
        async fetch() {
            const res = await this.$http.get('rest/ads')
            this.items = res.data
        },
        async remove(row) {
            this.$confirm(`是否删除该广告位，${row.name}`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then( async () => {
                    let res = await this.$http.delete(`rest/ads/${row._id}`)
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
            this.fetch()
            })
            }
    },
    created() {
        this.fetch()
    }
}
</script>

