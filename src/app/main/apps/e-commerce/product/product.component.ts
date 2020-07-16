import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';

import { Product } from 'app/main/apps/e-commerce/product/product.model';
import { EcommerceProductService } from 'app/main/apps/e-commerce/product/product.service';
import { Store, select } from '@ngrx/store';
import { IAppState } from 'app/store/state/app.state';
import { GetProduct } from 'app/store/actions/product.actions';
import { selectedProduct } from 'app/store/selectors/product.selector';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector     : 'e-commerce-product',
    templateUrl  : './product.component.html',
    styleUrls    : ['./product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations   : fuseAnimations
})
export class EcommerceProductComponent implements OnInit, OnDestroy
{
    product: Product;
    pageType: string;
    productForm: FormGroup;

    // Private
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {EcommerceProductService} _ecommerceProductService
     * @param {FormBuilder} _formBuilder
     * @param {Location} _location
     * @param {MatSnackBar} _matSnackBar
     */
    constructor(
        private _ecommerceProductService: EcommerceProductService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _store: Store<IAppState>,
        private _route: ActivatedRoute
    )
    {
        // Set the default
        this.product = new Product();

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._store.dispatch(new GetProduct(this._route.snapshot.params.id));
        this._store.pipe(select(selectedProduct)).subscribe((product:Product) => {
            if ( product )
            {
                this.product = new Product(product);
                this.pageType = 'edit';
            }
            else
            {
                this.pageType = 'new';
                this.product = new Product();
            }

            this.productForm = this.createProductForm();
        })
        
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create product form
     *
     * @returns {FormGroup}
     */
    createProductForm(): FormGroup
    {
        return this._formBuilder.group({
            id              : [this.product.id],
            name            : [this.product.name],
            handle          : [this.product.handle],
            description     : [this.product.description],
            categories      : [this.product.categories],
            tags            : [this.product.tags],
            images          : [this.product.images],
            priceTaxExcl    : [this.product.priceTaxExcl],
            priceTaxIncl    : [this.product.priceTaxIncl],
            taxRate         : [this.product.taxRate],
            comparedPrice   : [this.product.comparedPrice],
            quantity        : [this.product.quantity],
            sku             : [this.product.sku],
            width           : [this.product.width],
            height          : [this.product.height],
            depth           : [this.product.depth],
            weight          : [this.product.weight],
            extraShippingFee: [this.product.extraShippingFee],
            active          : [this.product.active]
        });
    }

    /**
     * Add product
     */
    addProduct(): void
    {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);

        this._ecommerceProductService.addProduct(data)
            .then(() => {

                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);

                // Show the success message
                this._matSnackBar.open('Product added', 'OK', {
                    verticalPosition: 'top',
                    duration        : 2000
                });

                // Change the location with new one
                this._location.go('apps/e-commerce/products/' + this.product.id + '/' + this.product.handle);
            });
    }
}
