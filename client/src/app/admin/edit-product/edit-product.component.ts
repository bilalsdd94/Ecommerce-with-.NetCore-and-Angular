import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {ShopService} from '../../shop/shop.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductFormValues} from '../../shared/models/product';
import {Brand} from '../../shared/models/brand';
import {forkJoin} from 'rxjs';
import { Type } from 'src/app/shared/models/type';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: ProductFormValues;
  brands: Brand[] = [];
  types: Type[] = [];

  constructor(private adminService: AdminService,
              private shopService: ShopService,
              private route: ActivatedRoute,
              private router: Router) {
    this.product = new ProductFormValues();
  }

  ngOnInit(): void {
    const brands = this.getBrands();
    const types = this.getTypes();

    forkJoin([types, brands]).subscribe(results => {
      this.types = results[0];
      this.brands = results[1];
    }, error => {
      console.log(error);
    }, () => {
      if (this.route.snapshot.url[0].path === 'edit') {
        this.loadProduct();
      }
    });
  }

  updatePrice(event: any) {
    this.product.price = event;
  }

  loadProduct() {
    const id = this.route.snapshot.paramMap.get('id');
    id && this.shopService.getProduct(+id).subscribe((response: any) => {

      const productBrandId = this.brands && this.brands.find(x => x.name === response.productBrand)?.id;
      const productTypeId = this.types && this.types.find(x => x.name === response.productType)?.id;
      this.product = {...response, productBrandId, productTypeId};
    });
  }

  getBrands() {
    return this.shopService.getBrands();
  }

  getTypes() {
    return this.shopService.getTypes();
  }

  onSubmit(product: ProductFormValues) {
    const id = this.route.snapshot.paramMap.get('id');
    if (this.route.snapshot.url[0].path === 'edit') {
      const updatedProduct = {...this.product, ...product, price: +product.price};
      id && this.adminService.updateProduct(updatedProduct, +id).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    } else {
      const newProduct = {...product, price: +product.price};
      this.adminService.createProduct(newProduct).subscribe((response: any) => {
        this.router.navigate(['/admin']);
      });
    }
  }
}