import { LightningElement, track, api, wire } from 'lwc';
import { bikes } from 'c/data';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import Id from '@salesforce/user/Id';
import NAME_FIELD from '@salesforce/schema/User.Name';

const FIELDS = [NAME_FIELD];

export default class Detail extends LightningElement {

    // Ensure changes are reactive when product is updated
    @track product;

    // Private var to track @api productId
    _productId = undefined;


    // Use set and get to process the value every time it's
    // requested while switching between products
    set productId(value) {
        this._productId = value;
        this.product = bikes.find(bike => bike.fields.Id.value === value);
    }
    
    // getter for productId
    @api get productId(){
        return this._productId;
    }

    userId = Id;
    @wire(getRecord, { recordId: '$userId', fields: FIELDS })
    user;
    get name() {
        return getFieldValue(this.user.data, NAME_FIELD);
    }
}