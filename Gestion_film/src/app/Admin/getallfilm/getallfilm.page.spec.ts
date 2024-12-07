import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GetallfilmPage } from './getallfilm.page';

describe('GetallfilmPage', () => {
  let component: GetallfilmPage;
  let fixture: ComponentFixture<GetallfilmPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GetallfilmPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
