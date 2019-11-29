<style lang="less" src="./ReserveBed.less" scoped></style>

<template>
    <transition name="pop-right">
        <layout-base id="ReserveBed" v-if="visibile">
            <v-header class="header" slot="header">
                <div class="iconfont icon-back" slot="left" @click="hidden()"></div>
                <div class="title" slot="center">预约床位</div>
            </v-header>
            <div class="page">
                <div class="head">
                    <div class="left">请选择房间</div>
                </div>
                <van-swipe @change="onChange1">
                    <van-swipe-item v-for="(item, index) in rooms" :key="index">
                        <ul class="room-page">
                            <li :class="{'on': i == activeRoom}"
                                v-for="(v, i) in item"
                                :key="i"
                                @click="selectRoom(v, i)">
                               <!-- <div class="room">1F</div> -->
                               <dl>
                                   <dt class="van-ellipsis">{{v.RoomName}}-{{v.RoomType}}</dt>
                                   <dd>当前可用床位：<span :class="{ 'full': v.RemainSeat == 0 }">{{v.RemainSeat}}</span></dd>
                                </dl>
                            </li>
                        </ul>
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        {{ current1 + 1 }}/{{rooms.length}}
                    </div>
                </van-swipe>

                <div class="head margin-top border-bottom">
                    <div class="left">请选择床位</div>
                    <ul class="status">
                        <li>空床位</li>
                        <li>已预定</li>
                        <li>已选中</li>
                    </ul>
                </div>
                <van-swipe @change="onChange2">
                    <van-swipe-item v-for="(item, index) in seats" :key="index + 100">
                        <ul class="bed-page">
                            <li v-for="(v, i) in item" :key="i">
                                <div class="btn"
                                     :class="{'max': !v.canAppoint, 'checked': i == activeSeat}"
                                     @click="selectBed(v, i)"></div>
                                <p>{{v.SeatName}}</p>
                            </li>
                        </ul>
                    </van-swipe-item>
                    <div class="custom-indicator" slot="indicator">
                        {{ current2 + 1 }}/{{seats.length}}
                    </div>
                </van-swipe>
            </div>
            
            <div class="button" @click="confirm()">确定预约床位</div>
        </layout-base>
    </transition>
</template>

<script>
export default {
    model: {
        prop : 'visibile',
        event: 'Hidden'
    },
    props: {
        visibile: {
            type    : Boolean,
            default : false
        },
        date: String
    },
    data () {
        return {
            current1    : 0,
            current2    : 0,
            activeRoom  : null,
            activeSeat  : null,
            rooms       : [],
            seats       : [],
            selecedRoom : null,
            selectedSeat: null
        }
    },
    methods: {
        hidden () {
            this.$emit('Hidden', false)
        },
        confirm () {
            if (!this.selectedSeat) {
                this.$toast('请选择房间和床位')
                return;
            }
            this.hidden()
            this.$emit('Select', Object.assign(this.selecedRoom, this.selectedSeat))
        },
        onChange1 (_i) {
            this.current1 = _i
        },
        onChange2 (_i) {
            this.current2 = _i
        },
        selectRoom (_v, _i) {
            this.seats      = []
            this.activeSeat = null
            if (this.activeRoom == _i) {
                this.activeRoom  = null
                this.selecedRoom = null
            } else {
                this.activeRoom = _i
                this.getSeatList(_v.RoomID)
                this.selecedRoom = {
                    RoomID  : _v.RoomID,
                    RoomName: _v.RoomName
                }
            }
        },
        selectBed (_v, _i) {
            if (!_v.canAppoint) {
                this.$toast('床位已满')
                return;
            }
            if (this.activeSeat == _i) {
                this.activeSeat   = null
                this.selectedSeat = null
            } else {
                this.activeSeat   = _i
                this.selectedSeat = {
                    SeatID  : _v.SeatID,
                    SeatName: _v.SeatName,
                    SeatType: _v.SeatType
                }
            }
        },
        twoArray (_arr1, _arr2, _len) {
            let page = []
            for (let i = 0, length = _arr1.length; i < length; i++) {
                const element = _arr1[i]
                if ((i + 1) % _len == 0) {
                    _arr2.push(page)
                    page = []
                }
                page.push(element)
                if (i < _len && i + 1 == length) _arr2.push(page)
            }
        },
        getRoomList () {
            this.$ajax({
                url : '/room/room/getRoomList',
                data: {
                    AppointDate: this.date
                }
            }).then((_res) => {
                let rooms = _res.filter(_item => _item.RoomID)
                this.twoArray(rooms, this.rooms, 6)
            })
        },
        getSeatList (_id) {
            this.$ajax({
                url : '/room/room/getRoomSeatList',
                data: {
                    AppointDate : this.date,
                    RoomID      : _id
                }
            }).then((_res) => {
                let seats = _res.filter(_item => _item.SeatID)
                this.twoArray(seats, this.seats, 6)
            })
        }
    },
    watch: {
        date (_v) {
            _v && this.getRoomList()
        }
    }
}
</script>