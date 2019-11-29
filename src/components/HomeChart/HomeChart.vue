<template>
    <div>
        <div class="chart" :id="id"></div>
    </div>
</template>

<script>

export default {
    props: {
        id: {
            type: String,
            default: '#chart'
        },
        rate: {
            type: [Number, String],
            default: 0
        },
        text: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        },
        color: String,
        subColor: String
    },
    mounted () {
        this.$nextTick(() => {
            this.setChart()
        })
    },
    watch: {
        rate () {
            this.setChart()
        },
        text () {
            this.setChart()
        }
    },
    methods: {
        setChart () {
            let chart = this.$echarts.init(document.getElementById(this.id));
            let option = {
                title: {
                    text: this.text,
                    subtext: this.title,
                            textStyle: {
                        color: '#fff',
                            fontSize: 30,
                                fontWeight: 'normal'
                    },
                    subtextStyle: {
                        color: '#fff',
                            fontSize: 13,
                                fontWeight: 'normal'
                    },
                    left: 'center',
                        bottom: '22%'
                },
                series: [{
                    type: 'pie',
                    hoverAnimation: false,
                    radius: ['99%', '100%'],
                    center: ['50%', '58%'],
                    startAngle: 225,
                    labelLine: { show: false },
                    data: [{
                        value: this.rate / 100 * 270,
                        label: {
                            normal: { show: false }
                        },
                        itemStyle: {
                            normal: {
                                borderColor: this.color,
                                borderWidth: 6
                            }
                        }
                    }, {
                        value: 270 - this.rate / 100 * 270,
                        itemStyle: {
                            normal: {
                                borderColor: this.subColor,
                                borderWidth: 6
                            }
                        }
                    }, {
                        value: 90,
                        itemStyle: {
                            normal: { color: 'transparent' }
                        }
                    }],
                }]
            };
            chart.setOption(option)
        }
    }
}
</script>

<style lang="less" scoped>
    .chart {
        height: 2.8rem;
    }
</style>