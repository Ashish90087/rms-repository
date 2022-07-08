import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { interval, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import {  retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(private http: HttpClient) { }
  save(functionName: any, data: any) {
    console.log(data)
    return this.http.post( environment.rootUrl + functionName, data).pipe(tap(res => { res }),
        catchError(e => {
            throw new Error(e);
        })
    );
}

saveDetails(functionName: any, data: any) {
  //console.log("kuch bhi",data);
  //console.log("kuch bhi",data.user_id[0]);
  return this.http.post( environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
          throw new Error(e);
      })
  );
}

public user=[];
saveMap(functionName: any, data: any) {

  return this.http.post( environment.rootUrl + functionName, this.user).pipe(tap(res => { res }),
      catchError(e => {
          throw new Error(e);
      })
  );
}

getFunction(functionName: any) {
  //console.log(functionName);
  return this.http.get(environment.rootUrl + functionName).pipe(tap(res => res), catchError(e => {

      throw new Error(e);
  }));
}

// getFun(functionName: any,data:any) {
//   console.log(data,"yahi wala");
//   return this.http.get(environment.rootUrl + functionName,data).pipe(tap(res => res), catchError(e => {

//       throw new Error(e);
//   }));
// }

updateFunction(functionName: any, data: any) {
  //console.log(data)
  return this.http.put( environment.rootUrl + functionName, data).pipe(tap(res => { res }),
      catchError(e => {
          throw new Error(e);
      })
  );
}




// getFunction1( functionName : any){
//   return this.http.get('http://localhost:3000/users').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));

// }

// getFunction2(functionName : any){
//   return this.http.get('http://localhost:3000/users/usermas').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));

// }
// getFunction3( functionName : any){
//   return this.http.get('http://localhost:3000/users/brand').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));

// }
// getFunction4( functionName : any){
//   return this.http.get('http://localhost:3000/users/stock').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));

// }
// getFunction5( functionName : any){
//   return this.http.get('http://localhost:3000/users/dummy').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));

// }
// getFunction7(functionName : any){
//   return this.http.get('http://localhost:3000/users/status').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   })
//   );
// }
// getFunction8( functionName : any){

//   return this.http.get('http://localhost:3000/users/receiving_stocks').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));

// }
// getFunction9( functionName : any){

//   return this.http.get('http://localhost:3000/users/getStocks').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));

// }
// issueStocks(data: any)
//     {
//         console.log(data)
//           return this.http.post('http://localhost:3000/users/issuedstocks',data).pipe(tap(res=>{res}),
//           catchError(e=>{
//             throw new Error(e);
//           }));

//     }
// getIssueStocks(functionName:any)
//     {
//       return this.http.get('http://localhost:3000/users/issuestocks').pipe(tap(res=>{res}),
//       catchError(e=>{
//         throw new Error(e);
//       }));
//     }
//     getIssueStocks1(functionName:any)
//     {
//       return this.http.get('http://localhost:3000/users/issuestocks1').pipe(tap(res=>{res}),
//       catchError(e=>{
//         throw new Error(e);
//       }));
//     }

// getHardwares(functionName:any){
//   return this.http.get('http://localhost:3000/users/hardwares').pipe(tap(res=>{res}),
//   catchError(e=>{
//     throw new Error(e);
//   }));
// }
// save_users(data: any){
//   console.log(data)
//     return this.http.post('http://localhost:3000/users/usermas',data).pipe(tap(res=>{res}),
//     catchError(e=>{
//       throw new Error(e);
//     }));

//   }

//  save_stocks(data: any){
//   console.log(data)
//     return this.http.post('http://localhost:3000/users/stocks',data).pipe(tap(res=>{res}),
//     catchError(e=>{
//       throw new Error(e);
//     }));

//   }
//   save_receiving_stocks(data: any,id1:any){
//     console.log("this is inside save till now no stock_id has been assigned",data);
//       return this.http.post('http://localhost:3000/users/receiving_stocks',data).pipe(tap(res=>{res}),
//       catchError(e=>{
//         throw new Error(e);
//       }));

//     }

  // updateStocks(data : any){
  //   return this.http.put('http://localhost:3000/users/stock',data).pipe(tap(res=>{res}),
  //   catchError(e=>{
  //     throw new Error(e);
  //   }));
  // }

  // updateStock(data : any){
  //   return this.http.get('http://localhost:3000/users/stock',data).pipe(tap(res=>{res}),
  //   catchError(e=>{
  //     throw new Error(e);
  //   }));
  // }
  
  updateStock(functionName:any){
    return this.http.get( environment.rootUrl + functionName).pipe(tap(res=>{res}),
    catchError(e=>{
      throw new Error(e);
    }));
  }


  // save_stocks2(data: any, id1: any){
  //   console.log(data);
  //   console.log("ID exist in dummy 2",id1);
  //   console.log("DATA exist in dummy 2",data);
  //     return this.http.put('http://localhost:3000/users/stocks/update',data).pipe(tap(res=>{res}),
  //     catchError(e=>{
  //       throw new Error(e);
  //     }));

  //   }
    // returnStocks(data: any)
    // {
    //     console.log(data)
    //       return this.http.post('http://localhost:3000/users/ReturnAndUpdateStock',data).pipe(tap(res=>{res}),
    //       catchError(e=>{
    //         throw new Error(e);
    //       }));

    // }
    returnStocks(functionName:any, data: any)
    {
        console.log(data)
          return this.http.post(environment.rootUrl + functionName,data).pipe(tap(res=>{res}),
          catchError(e=>{
            throw new Error(e);
          }));

    }

    returnedStocks(functionName:any, data:any){
      return this.http.get(environment.rootUrl + functionName,data).pipe(tap(res=>{res}),
      catchError(e=>{
        throw new Error(e);
      }));
    }
    // updateStatusInStockReceive(functionName:any,data:any){
    //   console.log("updateing Status",data);
    // //console.log("DATA exist in dummy 2",data);
    //   return this.http.put('http://localhost:3000/users/updateStatus',data).pipe(tap(res=>{res}),
    //   catchError(e=>{
    //     throw new Error(e);
    //   }));


    // }
    getStocksToReturn(functionName:any){
      return this.http.get(environment.rootUrl + functionName).pipe(tap(res=>{res}),
      catchError(e=>{
        throw new Error(e);
      }));

    }
   
    updateIssueStock(functionName : any){
      return this.http.get(environment.rootUrl + functionName).pipe(tap(res=>{res}),
      catchError(e=>{
        throw new Error(e);
      }));
    }
    

}
