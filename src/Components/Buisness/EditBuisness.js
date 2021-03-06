import React, { Component } from "react";
import FormComponent from "../../Form/FormComponent";
import { addBuisnessConfig, editBuisnessConfig } from "./BuisnessConfig";
import { fetchMethod } from "../../FetchMethod";
import swal from "sweetalert";
import {
  allBusinessesInfo,
  saveBusiness,
  getCardDetailsQuery,
  updateBankDetail,
  allcardtypes
} from "./BuisnessQuery";
import "./addBuisness.css";
import moment from "moment";
export default class EditBuisness extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cardid: undefined,
      editableData: undefined,
      cardnumber: undefined
    };
  }

  componentWillMount() {
    fetchMethod(allcardtypes)
      .then(res => res.json())
      .then(res => {
        return res !== undefined && res.data.allCardtypes !== undefined
          ? this.setState({
              cardtypeOptions: res.data.allCardtypes.Cardtypes.map(item => {
                return {
                  id: item.id,
                  name: item.cardtype
                };
              })
            })
          : "";
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
      });
    if (this.props.location.state !== undefined) {
      this.editBuisnessData(this.props.location.state.details);
    }
  }

  editBuisnessData = id => {
    fetchMethod(allBusinessesInfo(id))
      .then(res => res.json())
      .then(res => {
        fetchMethod(getCardDetailsQuery, {
          where: { businessId: id }
        })
          .then(resp => resp.json())
          .then(resp => {
            res.data.allBusinesses.Businesses[0].BSB = resp.data.allCardDetails
              .CardDetails[0]
              ? resp.data.allCardDetails.CardDetails[0].bsb
              : "";
            res.data.allBusinesses.Businesses[0].cardNumber = resp.data
              .allCardDetails.CardDetails[0]
              ? resp.data.allCardDetails.CardDetails[0].cardNumber
              : "";
            res.data.allBusinesses.Businesses[0].accNo = resp.data
              .allCardDetails.CardDetails[0]
              ? resp.data.allCardDetails.CardDetails[0].accountnumber
              : "";
            res.data.allBusinesses.Businesses[0].expirydate = resp.data
              .allCardDetails.CardDetails[0]
              ? resp.data.allCardDetails.CardDetails[0].expiryDate
              : "";
            res.data.allBusinesses.Businesses[0].cvv = resp.data.allCardDetails
              .CardDetails[0]
              ? resp.data.allCardDetails.CardDetails[0].cvc
              : "";
            res.data.allBusinesses.Businesses[0].holdername = resp.data
              .allCardDetails.CardDetails[0]
              ? resp.data.allCardDetails.CardDetails[0].accountname
              : "";

            res.data.allBusinesses.Businesses[0].cardtypeid =
              resp.data.allCardDetails.CardDetails[0] &&
              resp.data.allCardDetails.CardDetails[0].fkcardtypeidrel
                .Cardtypes[0]
                ? {
                    id:
                      resp.data.allCardDetails.CardDetails[0].fkcardtypeidrel
                        .Cardtypes[0].id,
                    name:
                      resp.data.allCardDetails.CardDetails[0].fkcardtypeidrel
                        .Cardtypes[0].cardtype
                  }
                : null;
            this.setState({
              cardid: resp.data.allCardDetails.CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].id
                : undefined,
              // cardid: resp.data.allCardDetails.CardDetails[0].id,
              editableData: res.data.allBusinesses.Businesses[0],
              cardnumber: resp.data.allCardDetails.CardDetails[0]
                ? resp.data.allCardDetails.CardDetails[0].cardNumber
                : ""
            });
          });
        // resp.data.allCardDetails.CardDetails.length > 0
        // this.setState({ editableData: res.data.allBusinesses.Businesses[0] });
      })
      .catch(e => {
        swal({ title: e.message, icon: "warning" });
        this.props.history.push("/buisness");
      });
  };

  closeForm = () => {
    this.props.history.push("/buisness");
  };

  preSubmitChanges = e => {
    // if (e.expirydate) {
    //   console.log("EEEEEEEEEEEEEe aaya ya ni aaya", e.expirydate.length);
    //   let expDateM = null;
    //   if (e.expirydate) {
    //     expDateM = `01/${e.expirydate}`;
    //   }
    //   console.log("expDateM", expDateM);

    //   let GettedMonth = 0;
    //   let CurrMonth = moment(new Date()).month() + 1;
    //   if (expDateM) {
    //     GettedMonth = moment(expDateM, "DD/MM/YYYY").month() + 1;
    //   }
    //   console.log("GettedMonth", GettedMonth, " CurrMonth", CurrMonth);

    //   let Gettedyear = 0;
    //   let Curryear = moment(new Date()).year();
    //   if (expDateM) {
    //     Gettedyear = moment(expDateM, "DD/MM/YYYY").year();
    //   }
    //   console.log("Gettedyear", Gettedyear, " Curryear", Curryear);

    //   let yearOkay = true;
    //   let monthOkay = true;

    //   if (Gettedyear && Gettedyear < Curryear) {
    //     yearOkay = false;
    //   }
    //   if (Gettedyear == Curryear && GettedMonth <= CurrMonth) {
    //     monthOkay = false;
    //   } else if (
    //     e.expirydate &&
    //     (String(e.expirydate).length < 7 || !String(e.expirydate).includes("/"))
    //   ) {
    //     console.log("inside alert  of e;lse if  string 7");
    //     swal({ title: "please fill valid exp date.", icon: "warning" });
    //     // alert("please fill valid exp date.");
    //     return;
    //   } else if (!yearOkay || (yearOkay && !monthOkay)) {
    //     if (!yearOkay) {
    //       console.log("inside alert  year okayh");
    //       swal({ title: "Enter valid year", icon: "warning" });
    //       // alert("Enter valid year");
    //       return;
    //     }

    //     if (yearOkay && !monthOkay) {
    //       console.log("inside alert  valid mionoth");
    //       swal({ title: "Enter valid month", icon: "warning" });
    //       // alert("Enter valid month");
    //       return;
    //     }
    //   } else if (isNaN(GettedMonth) || GettedMonth == 0) {
    //     console.log("inside alert  *********************** mionoth");
    //     swal({ title: "Enter valid month", icon: "warning" });
    //     // alert("Enter valid month");
    //     return;
    //   } else if (isNaN(Gettedyear) || Gettedyear == 0) {
    //     console.log(
    //       "inside alert  *******gettted yearl;;;;;;;;;;;;;**************** mionoth"
    //     );
    //     swal({ title: "Enter valid year", icon: "warning" });
    //     return;
    //     // alert("Enter valid year");
    //     // return;
    //   } else if (e.expirydate.length > 7) {
    //     console.log("*********yyyyyyyyyyyyyyy");
    //     swal({ title: "Enter valid year", icon: "warning" });
    //     return;
    //   } else if (!e.expirydate.includes("/")) {
    //     console.log("ejejjejee");
    //     swal({ title: "Enter valid year", icon: "warning" });
    //     return;
    //   }
    // }
    if (e.cardNumber) {
      fetchMethod(getCardDetailsQuery, {
        where: {
          cardNumber: e.cardNumber
        }
      })
        .then(res => res.json())
        .then(response => {
          if (
            response.data.allCardDetails.CardDetails.length > 0 &&
            this.state.cardnumber !== e.cardNumber
          ) {
            swal({ title: "card already exist.", icon: "warning" });
            return false;
          } else {
            let businessObj = {
              id: this.props.location.state.details,
              active: 1,
              storeName: e.storeName,
              abnNumber: e.abnNumber,
              websiteUrl: e.websiteUrl,
              email: e.email,
              txnLocationAddress: e.txnLocationAddress,
              txnLocationCity: e.txnLocationCity,
              txnLocationState: e.txnLocationState,
              txnLocationCountry: e.txnLocationCountry,
              contactLocationAdress: e.contactLocationAdress,
              contactLocationCity: e.contactLocationCity,
              contactLocationState: e.contactLocationState,
              contactLocationCountry: e.contactLocationCountry,
              storeManagerName: e.storeManagerName,

              adminId: JSON.parse(localStorage.getItem("userInfo")).id,
              createdBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`,
              updatedBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`,
              mobileNo: parseFloat(e.mobileNo),
              storeTelephoneNo: parseFloat(e.storeTelephoneNo),
              contactLocationZipCode: parseFloat(e.contactLocationZipCode),
              txnLocationZipCode: parseFloat(e.txnLocationZipCode)
            };
            // e["active"] = 1;
            // e["adminId"] = JSON.parse(localStorage.getItem("userInfo")).id;
            // e["updatedBy"] = `${JSON.parse(localStorage.getItem("userInfo")).id}`;
            // e.mobileNo = parseFloat(e.mobileNo);
            // e.storeTelephoneNo = parseFloat(e.storeTelephoneNo);
            // e.contactLocationZipCode = parseFloat(e.contactLocationZipCode);
            // e.txnLocationZipCode = parseFloat(e.txnLocationZipCode);

            fetchMethod(saveBusiness, { obj: businessObj })
              .then(res => res.json())
              .then(response => {
                const id = response.data.saveBusiness;
                if (id && id !== null) {
                  let Obj = {
                    obj: {
                      // id: this.state.cardid,
                      // userId: userInfo.id,
                      businessId: id.id,
                      // id: CardID ? CardID : null,
                      cvc: e.cvv,
                      expiryDate: e.expirydate,
                      cardNumber: e.cardNumber,
                      createdAt: Date.now(),
                      accountname: e.holdername,
                      accountnumber: e.accNo,
                      bsb: e.BSB,
                      cardtypeid: e.cardtypeid ? e.cardtypeid.id : 1,
                      cardstatus: "0"
                    }
                  };
                  if (this.state.cardid) {
                    Obj.obj.id = this.state.cardid;
                  }
                  if (
                    e.cvv ||
                    e.expirydate ||
                    e.cardNumber ||
                    e.holdername ||
                    e.accNo ||
                    e.BSB ||
                    e.cardtypeid
                  ) {
                    fetchMethod(updateBankDetail, Obj)
                      .then(response => response.json())
                      .then(res => {
                        // setLoading(false);
                        // console.log("res _updateBankDetail => ", res);
                        // navigation.navigate("Profile");
                      })
                      .catch(e => {
                        // setLoading(false);
                        // alert(e);
                        // console.log("_updateBankDetail error ", e);
                      });
                  }
                  swal({
                    text: "Buisness updated successfully",
                    icon: "success"
                  });
                  this.props.history.push("/buisness");
                } else if (id === null) {
                  swal("Email already exists", { icon: "error" });
                } else {
                  swal("Please try again", { icon: "error" });
                  this.props.history.push("/buisness");
                }
              });
            return false;
          }
        });
    } else {
      let businessObj = {
        id: this.props.location.state.details,
        active: 1,
        storeName: e.storeName,
        abnNumber: e.abnNumber,
        websiteUrl: e.websiteUrl,
        email: e.email,
        txnLocationAddress: e.txnLocationAddress,
        txnLocationCity: e.txnLocationCity,
        txnLocationState: e.txnLocationState,
        txnLocationCountry: e.txnLocationCountry,
        contactLocationAdress: e.contactLocationAdress,
        contactLocationCity: e.contactLocationCity,
        contactLocationState: e.contactLocationState,
        contactLocationCountry: e.contactLocationCountry,
        storeManagerName: e.storeManagerName,

        adminId: JSON.parse(localStorage.getItem("userInfo")).id,
        createdBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`,
        updatedBy: `${JSON.parse(localStorage.getItem("userInfo")).id}`,
        mobileNo: parseFloat(e.mobileNo),
        storeTelephoneNo: parseFloat(e.storeTelephoneNo),
        contactLocationZipCode: parseFloat(e.contactLocationZipCode),
        txnLocationZipCode: parseFloat(e.txnLocationZipCode)
      };
      // e["active"] = 1;
      // e["adminId"] = JSON.parse(localStorage.getItem("userInfo")).id;
      // e["updatedBy"] = `${JSON.parse(localStorage.getItem("userInfo")).id}`;
      // e.mobileNo = parseFloat(e.mobileNo);
      // e.storeTelephoneNo = parseFloat(e.storeTelephoneNo);
      // e.contactLocationZipCode = parseFloat(e.contactLocationZipCode);
      // e.txnLocationZipCode = parseFloat(e.txnLocationZipCode);

      fetchMethod(saveBusiness, { obj: businessObj })
        .then(res => res.json())
        .then(response => {
          const id = response.data.saveBusiness;
          if (id && id !== null) {
            let Obj = {
              obj: {
                // id: this.state.cardid,
                // userId: userInfo.id,
                businessId: id.id,
                // id: CardID ? CardID : null,
                cvc: e.cvv,
                expiryDate: e.expirydate,
                cardNumber: e.cardNumber,
                createdAt: Date.now(),
                accountname: e.holdername,
                accountnumber: e.accNo,
                bsb: e.BSB,
                cardtypeid: e.cardtypeid ? e.cardtypeid.id : 1,
                cardstatus: "0"
              }
            };
            if (this.state.cardid) {
              Obj.obj.id = this.state.cardid;
            }
            if (
              e.cvv ||
              e.expirydate ||
              e.cardNumber ||
              e.holdername ||
              e.accNo ||
              e.BSB ||
              e.cardtypeid
            ) {
              fetchMethod(updateBankDetail, Obj)
                .then(response => response.json())
                .then(res => {
                  // setLoading(false);
                  // console.log("res _updateBankDetail => ", res);
                  // navigation.navigate("Profile");
                })
                .catch(e => {
                  // setLoading(false);
                  // alert(e);
                  // console.log("_updateBankDetail error ", e);
                });
            }
            swal({ text: "Buisness updated successfully", icon: "success" });
            this.props.history.push("/buisness");
          } else if (id === null) {
            swal("Email already exists", { icon: "error" });
          } else {
            swal("Please try again", { icon: "error" });
            this.props.history.push("/buisness");
          }
        });
      return false;
    }
  };

  render() {
    return (
      <div>
        {this.props.location.state !== undefined ? (
          this.state.editableData !== undefined &&
          this.state.cardtypeOptions != undefined ? (
            <div className="addBuisnessSection">
              <h3>Edit Business</h3>
              <FormComponent
                editableData={this.state.editableData}
                formConfig={editBuisnessConfig}
                preSubmitChanges={this.preSubmitChanges}
                buttonTitleCSS="buisnessSaveButton"
                modalCloseCallback={() => {}}
                closeButton={this.closeForm}
                params={{
                  cardtypeOptions: this.state.cardtypeOptions
                }}
              />
            </div>
          ) : (
            ""
          )
        ) : (
          this.props.history.push("/buisness")
        )}
      </div>
    );
  }
}
