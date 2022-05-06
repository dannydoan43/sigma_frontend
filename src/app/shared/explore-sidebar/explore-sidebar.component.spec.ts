import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExploreSidebarComponent } from './explore-sidebar.component';

describe('ExploreSidebarComponent', () => {
  let component: ExploreSidebarComponent;
  let fixture: ComponentFixture<ExploreSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExploreSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExploreSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
