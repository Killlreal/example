<template lang="pug">
.personal-area
    headerNav(:user="this.USER" v-if="userloaded")
    .wrapper
        .caledar
            .main-date
                .main-date__title
                    .main-date__mounth {{ month}}
                    .main-date__year {{ year }}
                .main-date__slider
                    ul.arrows
                        li
                            span(@click = "prev")
                                svg(width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg")
                                    path(d="M0 6.5L7.5 0.870834L7.5 12.1292L0 6.5Z" fill="#617F88")
                        li
                            span(@click = "next")
                                svg(width="8" height="13" viewBox="0 0 8 13" fill="none" xmlns="http://www.w3.org/2000/svg")
                                    path(d="M8 6.5L0.5 0.870834L0.5 12.1292L8 6.5Z" fill="#617F88")
            .weeks
                .weeks__name
                    ul.weeks__titles
                        li.weeks__title(v-for="day in weekdays") {{ day }}
                .days
                    .numbers(@click = "dayClick(day)" v-for="(day, index) in days" :style="{ gridColumn: column(index) }" :class="{ active: current(day), today: today(day), one: day.format('D').length == 1 }") {{ day.format('D')}}
        .events
            .events__title Событие
            .events__date Сегодня 20 мая
            .events__today
                .events__block
                    .events__block_title Событие 1
                    .events__block_time
                        .time-start 17:00
                        .time-end 18:00
                .events__block
                    .events__block_title Событие 2
                    .events__block_time
                        .time-start 17:00
                        .time-end 18:00
                .events__block
                    .events__block_title Событие 3
                    .events__block_time
                        .time-start 17:00
                        .time-end 18:00
                .events__block
                    .events__block_title Событие 4
                    .events__block_time
                        .time-start 17:00
                        .time-end 18:00


</template>
<script>
import { mapActions, mapGetters } from "vuex";
import headerNav from "../header/header-nav.vue";
import moment from 'moment'
export default {
    name: "calendar",
    data() {
        return {};
    },
    components: {
        headerNav
    },
    data() {
        return {
            weekdays: ['пн', 'вт','ср','чт','пт','сб', 'вс' ],
            mnts: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            month: '',
            year: '',
            days: [],
            userloaded: false,
            monthDate: '',
            dayClicked: ''
        };
    },
    methods: {
        ...mapActions(["REMEMBER_USER"]),
        column(index) {
            if (index == 0) {
                return this.days[0].day() + 1
            }
        },
        today(day) {
            return moment().isSame(day, 'day')
        },
        dayClick(day) {
            this.dayClicked = day
        },
        current(day) {
            return moment().isSame(day, this.dayClicked)
        },
        prev(){
            this.monthDate = this.monthDate.subtract(1, 'months').startOf('month')
            this.days = [...Array(this.monthDate.daysInMonth())].map((_, i) => this.monthDate.clone().add(i, 'day'))
            this.month = this.mnts[this.monthDate.month()]
            this.year = this.monthDate.year()
        },
        next(){
            this.monthDate = this.monthDate.add(1, 'months').startOf('month')
            this.days = [...Array(this.monthDate.daysInMonth())].map((_, i) => this.monthDate.clone().add(i, 'day'))
            this.month = this.mnts[this.monthDate.month()]
            this.year = this.monthDate.year()
        }
    },
    computed: {
        ...mapGetters(["USER"])
    },
    mounted() {
        this.monthDate = moment().startOf('month')
        this.days = [...Array(this.monthDate.daysInMonth())].map((_, i) => this.monthDate.clone().add(i, 'day'))
        this.month = this.mnts[moment().month()]
        this.year = this.monthDate.year()
    },
    async created() {
        if (this.USER === null) {
            await this.REMEMBER_USER();
            this.userloaded = true;

        } else {
            this.userloaded = true;
        }
    }
};
</script>
<style lang="scss"></style>