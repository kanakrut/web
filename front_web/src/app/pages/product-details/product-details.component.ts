import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {ApiService} from '../../services/api.service';
import {Product} from '../../models/Product';
import {Comment} from '../../models/Comment';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {

  product = new Product();
  comments: Comment[] = []
  loading = false;

  constructor(
    private route: ActivatedRoute,
    public userService: UserService,
    private router: Router,
    private apiService: ApiService,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {

      this.apiService.getProductDetails(params.id)
        .subscribe(res => {
          this.product = res;
          this.getComments();
        });
    });
  }

  addToCart() {
    this.loading = true;
    if (this.userService.logged) {
      this.userService.user.cart.products.push(this.product.id);
      this.apiService.updateCart(this.userService.user.cart).subscribe(res => {
        this.loading = false;
        alert(this.product.title + ' was added to your cart!');
      });
    } else {
      this.loading = false;
      this.router.navigate(['/login']);
    }
  }

  addComment(message) {
    this.loading = true;
    const comment = new Comment();
    comment.message = message;
    comment.user_id = this.userService.user.id;
    comment.product_id = this.product.id;
    this.apiService.addComment(comment).subscribe(res => {
      this.getComments();
      alert('Comment was added!');
      this.loading = false;
    }, error => console.log(error));
  }

  getComments() {
    this.comments = []
    this.apiService.getComments().subscribe(comments => {
      this.comments = comments.filter(comment => comment.product.id === this.product.id);
    });
  }

  updateComment(comment, message) {
    comment.message = message;
    this.apiService.updateComment(comment).subscribe(res => alert('Comment was updated!'));
  }

  deleteComment(comment) {
    this.apiService.deleteCart(comment).subscribe(res => {
      this.getComments();
      alert('Comment was deleted!');
    });
  }


}
