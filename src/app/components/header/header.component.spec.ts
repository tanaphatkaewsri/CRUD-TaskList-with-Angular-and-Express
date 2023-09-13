import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from './header.component';
import { ActivatedRoute, Router } from '@angular/router';

import { Subject} from 'rxjs';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;
  const mockActivatedRoute = {
    root: {
      snapshot: {
        url: [{ path: '/' }],
      },
    },
  };
  const rounterEventSubject = new Subject();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [HeaderComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: mockActivatedRoute,
          },          
        },
      ],
    });
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
