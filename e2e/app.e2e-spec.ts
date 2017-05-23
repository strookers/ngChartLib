import { StackedPage } from './app.po';

describe('stacked App', () => {
  let page: StackedPage;

  beforeEach(() => {
    page = new StackedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
