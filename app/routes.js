import Viewport from './Viewport';
import DragExample from './DragExample';
import Santa from './Santa';
import NewYear from './NewYear';
import Example from './Example';
import Test from './Test';

export default {
  Santa: (startAnimationAgain) => ({
    index: 'santa',
    component: Santa,
    props: {
      startAnimationAgain
    }
  }),
  NewYear: {
    index: 'newyear',
    component: NewYear
  },
  Viewport: {
    index: 'viewport',
    component: Viewport
  },
  DragExample: {
    index: 'draganddrop',
    component: DragExample
  },
  Example: {
    index: 'example',
    component: Example
  },
  Test: {
    index: 'text',
    component: Test
  }
};
