#include<stdio.h>
#include<math.h>
int min(int a,int b){
    if(a>b)return b;
    else return a;
}
int main(){
    int m,n;
    while(scanf("%d",&m)){
        if(m==0)break;
        scanf("%d",&n);
        n=n+2;
        int point[n],i,j;
        for(i=1;i<n-1;i++)scanf("%d",&point[i]);
        point[0]=0;
        point[n-1]=m;
        int cost[n][n];
        for(i=0;i<n;i++){
            for(j=0;j<n;j++){
                int end =i+j;if(end>=n)break;
                int k,m=21000000;
                for(k=j+1;k<end;k++)
                    m=min(m,cost[j][k]+cost[k][end]);
                if(end<=j+1)cost[j][end]=0;
                else cost[j][end]=m+point[end]-point[j];
            }
        }
        printf("%d\n",cost[0][n-1]);
    }
}
