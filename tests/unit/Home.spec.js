import { mount } from '@vue/test-utils'
import Home from '@/views/Home.vue'


  it('rendered successfully', () => {
    const msg = 'new message'
    const wrapper = mount(Home)
    expect(wrapper.exists).toBe(true)
  })

