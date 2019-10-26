import {Component, ElementRef, NgZone, OnInit, TemplateRef, ViewChild} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

import { RegistarClienteForm } from '../form/registar-cliente.form';
import { RegistrarClienteService } from '../servico/registrar-cliente.service';

import { MapsAPILoader, MouseEvent } from '@agm/core';
import { RouteDataTransfer } from '../../utils/route-data-transfer';

import { Cliente } from '../model/cliente';

@Component({
    selector: 'app-registrar-cliente',
    templateUrl: './registrar-cliente.component.html',
    styleUrls: ['./registrar-cliente.component.css']
})
export class RegistrarClienteComponent implements OnInit {
    readonly maskPhone: string = '(00) 00000-0000';
    private clienteEdit: any;
    public user: any;
    public modalRef: BsModalRef;
    public content: string;

    @ViewChild('search', {static: false})
    public searchElementRef: ElementRef;

    public registarClienteForm: RegistarClienteForm;

    public latitude: number;
    public longitude: number;
    public zoom: number;
    public address: string;
    public geoCoder: any;

    constructor(
        private modalService: BsModalService,
        private registrarClienteService: RegistrarClienteService,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private routeDataTransfer: RouteDataTransfer
    ) {
        this.registarClienteForm = new RegistarClienteForm();
        this.zoom = 8;
        this.latitude = -7.1195;
        this.longitude = -34.845;
        this.clienteEdit = null;
        this.user = null;
    }

    ngOnInit() {
        this.user = JSON.parse(localStorage.getItem('usuario'));

        if (!this.user) {
            this.logout();
        }

        if (this.isEditar()) {
            this.popularDadosEditar();
        }
    }

    public salvarRegistro(template: TemplateRef<any>) {
        this.registrarClienteService.salvarCliente(this.buildCliente()).subscribe(
            dados => {
                this.registarClienteForm.limpaDadosCliente();
                this.content = 'Cliente salvo com sucesso.';
                this.modalRef = this.modalService.show(template);
                }, error2 => {
                this.content = 'Erro ao salvar Cliente.';
                this.modalRef = this.modalService.show(template);
            }
        );
    }

    public salvarEditar(template: TemplateRef<any>) {
        this.registrarClienteService.editarCliente(this.buildCliente()).subscribe(
            dados => {
                this.content = 'Cliente editado com sucesso.';
                this.modalRef = this.modalService.show(template);
                this.router.navigateByUrl('listar-cliente');
            }, error2 => {
                this.content = 'Erro ao editar Cliente.';
                this.modalRef = this.modalService.show(template);
            }
        );
    }

    public logout() {
        localStorage.removeItem('usuario');
        localStorage.clear();
        this.router.navigateByUrl('login');
    }

    private buildCliente(): Cliente {
        return new Cliente(
            this.clienteEdit ? this.clienteEdit.id : null,
            this.registarClienteForm.get('nome').value,
            this.registarClienteForm.get('telefone').value,
            this.registarClienteForm.get('estado').value,
            this.registarClienteForm.get('cidade').value,
            this.registarClienteForm.get('bairro').value,
            this.registarClienteForm.get('pais').value,
            this.registarClienteForm.get('logradouro').value,
            this.registarClienteForm.get('cep').value,
            this.registarClienteForm.get('numero').value,
        );
    }

    /**
     * @returns {boolean}
     */
    public isEditar(): boolean {
        return this.activatedRoute.snapshot.url[0].path === 'editar-cliente' ? true : false;
    }

    /**
     * @returns {boolean}
     */
    public isRegistrar(): boolean {
        return this.activatedRoute.snapshot.url[0].path === 'registrar-cliente' ? true : false;
    }

    public markerDragEnd($event: MouseEvent) {
        console.log($event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress(this.latitude, this.longitude);
    }

    public getAddress(latitude, longitude) {
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
            console.log(results);
            console.log(status);
            if (status === 'OK') {
                if (results[0]) {
                    this.zoom = 12;
                    this.address = results[0].formatted_address;
                } else {
                    window.alert('No results found');
                }
            } else {
                window.alert('Geocoder failed due to: ' + status);
            }

        });
    }

    public consultaCepEndereco(cep: any, template: TemplateRef<any>) {
        if (!cep) {
            return;
        }

        this.registrarClienteService.consultaCep(cep).subscribe(
            dados => {
                if (dados.erro) {
                    this.content = 'Cep não encontrado.';
                    this.modalRef = this.modalService.show(template);
                    this.registarClienteForm.limpaDadosEndereco();

                    return;
                }

                this.registarClienteForm.populaDadosEndereco(dados);
                this.mapearLocalizacao(cep);
            }, error => {
                this.content = 'Erro ao obter cep!';
                this.modalRef = this.modalService.show(template);
            });
    }

    private setCurrentLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                console.log('latitude', position.coords.latitude);
                console.log('longitude', position.coords.longitude);
                this.latitude = position.coords.latitude;
                this.longitude = position.coords.longitude;
                this.zoom = 15;
            });
        }
    }

    // public mapClicked($event: LatLngLiteral) {
    //     console.log('$event', $event);
    //     this.markers.push({
    //         latitude: $event.lat,
    //         longitude: $event.lng,
    //         draggable: true
    //     });
    // }

    private mapearLocalizacao(cep: string) {
        this.setCurrentLocation();
        this.mapsAPILoader.load().then(() => {
            this.geoCoder = new google.maps.Geocoder();

            const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
                types: ['address']
            });

            const g = google.maps.places;
            const autoco = new g.Autocomplete(this.searchElementRef.nativeElement, {
                types : ['address']
            });
            console.log('autocomplete', autocomplete);
            console.log('autoco', autoco);
            autoco.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();

                    console.log('place', place);
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    }
                    console.log('lat', place.geometry.location.lat());
                    console.log('lng', place.geometry.location.lng());

                    this.latitude = place.geometry.location.lat();
                    this.longitude = place.geometry.location.lng();
                    this.zoom = 12;
                    this.registarClienteForm.get('latitude').setValue(this.latitude);
                    this.registarClienteForm.get('longitude').setValue(this.longitude);
                });
            });
        });

        // this.mapsAPILoader.load().then(() => {
        //     this.ngZone.run(() => {
        //         const geocoder = new google.maps.Geocoder();
        //         geocoder.geocode( { 'address': cep }, function(results, status) {
        //             if (status === google.maps.GeocoderStatus.OK) {
        //                 this._latitude = results[0].geometry.location.lat();
        //                 this._longitude = results[0].geometry.location.lng();
        //                 this._zoom = 18;
        //             } else {
        //                 alert('Não foi possivel obter localização: ' + status);
        //             }
        //         });
        //     });
        // });
    }

    private popularDadosEditar() {
        this.clienteEdit = this.routeDataTransfer.getElement('cliente');

        this.registrarClienteService.buscarCliente(this.clienteEdit).subscribe(
            endereco => {
                this.registarClienteForm.populateValueEndereco(this.clienteEdit, endereco);
            }, error2 => {
                alert('Erro ao buscar endereço do cliente.');
            }
        );
    }
}
