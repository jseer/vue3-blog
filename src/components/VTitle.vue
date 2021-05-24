<script>
import { h, toRefs } from 'vue';
export default {
    name: 'VTitle',
    props: {
        title: String,
        level: {
            type: Number,
            default: 2,
        }
    },
    setup(props, { slots }) {
        const { level, title } = toRefs(props);
        return ()=>h(
            'h' + level.value,
            {class: 'title'},
            [title.value, slots.actions ? slots.actions() : null],
        )
    }
}
</script>

<style>
.title {
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>